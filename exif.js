/*jslint node: true */
var exec = require('child_process').execFile;

function Exif() {
  'use strict';

}

Exif.prototype.wirteExif = function (imagePath, long, lat) {
  'use strict';

  var cmdLong = "-GPSLongitude=\"" + long + "\"",
    cmdLat = "-GPSLatitude=\"" + lat + "\"";

  console.log("cmdLong: " + cmdLong);
  console.log("cmdLat: " + cmdLat);
  console.log("imagePath: " + imagePath);

  exec('exiftool/exiftool.exe', [cmdLong, cmdLat, imagePath], function (err, data) {
    console.log(err);
    console.log(data.toString());
  });
};

Exif.prototype.readExif = function (imagePath) {
  'use strict';

  exec('exiftool/exiftool.exe', [imagePath], function (err, data) {
    console.log(err);
    console.log(data.toString());
  });
};

module.exports = Exif;
