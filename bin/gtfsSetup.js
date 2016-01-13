var translink = require('./lib/TranslinkGTFS.js');

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
