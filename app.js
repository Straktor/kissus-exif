/*jslint node: true */
var argv = require('minimist')(process.argv.slice(2)),
  Exif = require('./exif.js'),
  FsReader = require('./fsReader.js');

var logFilePath,
  imageFolderPath,
  data,
  imgCnt,
  parsedData = [],
  fsReader = new FsReader(),
  exif = new Exif();

// Parse command line arguments
if (argv.i) {
  if (!fsReader.checkIfDirExist(argv.i)) {
    console.log("Err: Image folder path is not valid (Usage: -i <folderPath>)");
    process.exit(1);
  } else {
    imageFolderPath = argv.i;
  }
} else {
  console.log("Err: No image folder path specified (Usage: -i <folderPath>)");
  process.exit(1);
}
if (argv.l) {
  if (!fsReader.checkIfFileExist(argv.l)) {
    console.log("Err: Log file path is not valid (Usage: -l <logFilePath>)");
    process.exit(1);
  } else {
    logFilePath = argv.l;
  }
} else {
  console.log("Err: No log file path specified (Usage: -l <logFilePath>)");
  process.exit(1);
}

// Find the array's value closest to the timeValue
function findClosestTimestamp(timeValue, dataList) {
  'use strict';

  var i,
    newdiff,
    currIndex = 0,
    diff = Math.abs(timeValue - dataList[currIndex].unixOffset);

  for (i = 0; i < dataList.length; i += 1) {
    newdiff = 0;

    newdiff = Math.abs(timeValue - dataList[i].unixOffset);

    if (newdiff < diff) {
      diff = newdiff;
      currIndex = i;
    }

  }
  return currIndex;
}

var logData = fsReader.readAccelerometerLog(logFilePath);
var imageList = fsReader.getImageList(imageFolderPath);

for (imgCnt = 0; imgCnt < imageList.length; imgCnt += 1) {
  var time,
    index;

  time = imageList[imgCnt].unixOffset.valueOf();
  index = findClosestTimestamp(time, logData);

  console.log("Image: " + (imgCnt + 1) + " -- time: " + time + " -- closest: " + logData[index].unixOffset + " Long: " + logData[index].longitude + " Lat: " + logData[index].latitude);

  exif.wirteExif(imageFolderPath + "/" + imageList[imgCnt].imgName, logData[index].latitude, logData[index].longitude);

}
