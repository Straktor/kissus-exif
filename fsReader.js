/*jslint node: true */
var fs = require('fs'),
  moment = require('moment');

function FsReader() {
  'use strict';

}

FsReader.prototype.getImageList = function (folderPath) {
  'use strict';

  var folderContent,
    i,
    imgData = {},
    imgs = [];

  folderContent = fs.readdirSync(folderPath);

  for (i = 0; i < folderContent.length; i += 1) {
    imgData = {};

    if (folderContent[i].match(/\.jpg$/)) {

      imgData = {
        "imgName": folderContent[i],
        "unixOffset": moment(folderContent[i].slice(0, -4), "YYYYMMDDHHmmssSSS").valueOf()
      };

      imgs.push(imgData);

    }
  }

  return imgs;
};

FsReader.prototype.readAccelerometerLog = function (filePath) {
  'use strict';

  var data,
    i,
    date,
    splittedData = [],
    parsedData = [],
    jsonData;

  data = fs.readFileSync(filePath, 'utf8');
  data = data.split("\r\n");

  for (i = 0; i < data.length; i += 1) {
    jsonData = {};

    splittedData = data[i].split(";");

    date = moment(splittedData[1], "YYYY-MM-DD_HH-mm-ss-SSS");

    if (date.isValid()) {
      jsonData = {
        "timestamp": splittedData[1],
        "unixOffset": date.valueOf(),
        "latitude": splittedData[3],
        "longitude": splittedData[4]
      };

      parsedData.push(jsonData);
    }
  }

  return parsedData;
};

FsReader.prototype.checkIfDirExist = function (folderPath) {
  'use strict';

  try {
    // Query the entry
    var stats = fs.lstatSync(folderPath);

    // Is it a directory?
    if (stats.isDirectory()) {
      return true;
    }
  } catch (e) {
      // ...
  }
  return false;
};

FsReader.prototype.checkIfFileExist = function (filePath) {
  'use strict';

  try {
    // Query the entry
    var stats = fs.lstatSync(filePath);

    // Is it a directory?
    if (stats.isFile()) {
      return true;
    }
  } catch (e) {
      // ...
  }
  return false;
};

module.exports = FsReader;
