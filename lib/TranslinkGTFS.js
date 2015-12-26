var fs = require('fs');
var Zip = require('adm-zip');
var Download = require('./download');
var mkdirp = require('mkdirp');

exports = module.exports = {
  'gtfs': 'http://translink.com.au/sites/default/files/assets/resources/about-translink/reporting-and-publications/open-data/gtfs/SEQ.zip',
  'gtfsrt': 'https://gtfsrt.api.translink.com.au/Feed/SEQ',
  'gtfsDir': './resources/gtfs/'
};

/* Checks for any pre-exsisting download unpacked GTFS Transit data
 */
exports.checkForGTFSData = function checkForData (callback) {
  var neededFiles = ['agency', 'calendar', 'calendar_dates', 'feed_info', 'routes', 'shapes', 'stop_times', 'stops', 'trips'];
  fs.readdir(exports.gtfsDir, function (err, files) {
    if (err) callback(err);
    neededFiles.forEach(function (neededFile) {
      if (files.indexOf(neededFile + '.txt') < 0) {
        callback(new Error('Missing File'));
      }
    });
  });
};

/* Downloads and unpacks a GTFS ZIP file to the provided directory
 */
exports.downloadGTFSData = function downloadGTFSData (callback) {
  mkdirp.sync(exports.gtfsDir); // ensure the dir exists
  var file = exports.gtfsDir + 'TranslinkGTFS.zip';
  try {
    var t = fs.statSync(exports.gtfsDir + 'TranslinkGTFS.zip'); // Check if the .zip already exists
    if (t) unpackGTFSData(file, callback);
  } catch (e) {
    Download(exports.gtfs, file)
      .then(function (filename) {
        console.log('Download of file finished with name: %s', filename);
        unpackGTFSData(file, callback);
      })
      .catch(function (err) {
        console.log('Failed to download the file');
        console.log(err.stack);
      });
  }
};

/* Assumes that TranslinkGTFS.zip exists in the correct position.
 * ~RUNS SYNCRONOUSLY~ and thus is very expensive and should, all things be
 * considered only be run once during initial setup of the server
 */
var unpackGTFSData = function unpackGTFSData (filename, callback) {
  var zip = new Zip(filename);
  zip.extractAllTo(exports.gtfsDir, true);
};
