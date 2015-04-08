/*jslint node: true */
var Exif = require('./exif.js'),
  FsReader = require('./fsReader.js');

var logFilePath = "data/LOG_2015-04-03_21-21-57MPU6515_Accelerometer.log",
  imageFolderPath = "data",
  data,
  imgCnt,
  parsedData = [],
  fsReader = new FsReader(),
  exif = new Exif();

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
