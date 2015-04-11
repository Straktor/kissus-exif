KissUS-Exif
======

# Project setup
## Dependencies
You will need [node.js](http://nodejs.org/).

You will need to download [exiftool.exe](http://www.sno.phy.queensu.ca/~phil/exiftool/index.html) and put it at
```
/kissus-exif/exiftool.exe
```

You will need to put your images (.jpg) and log file in a data folder
```
/kissus-exif/data/
```

For this version the log file name has to be
```
LOG_2015-04-03_21-21-57MPU6515_Accelerometer.log
```

## Running
Run at least once to install dependencies
```
$ npm install 
```
To start you need to specify the path to the folder that contains the images (.jpg) and the path to the log file:
```
$ node app.js -i <imageFolderPath> -l <logFilePath>
```