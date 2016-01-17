var translink = require('./lib/TranslinkGTFS.js');
var download = require('../node_modules/gtfs/scripts/download.js');

console.log('Checking GTFS Data');
translink.checkForGTFSData(function (err) {
  if (err) {
    console.log('GTFS Data doesn\'t exist, downloading it now');
    translink.downloadGTFSData(function () {
      console.log('Finished downloading GTFS data');
    });
  } else {
    console.log('GTFS Data loaded successfully');
  }
});

// Load the config file
var config;
try {
  config = require('../resources/config.js');
} catch (e) {
  try {
    config = require('../resources/config-sample.js');
  } catch (e) {
    throw new Error('Cannot find config.js');
  }
}

download(config, function () {
  process.exit();
});
