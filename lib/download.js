// Credit goes to: https://gist.github.com/alanhoff/fe17f8cbc1888110ba33

var request = require('request');
var fs = require('fs');
var Promise = require('bluebird');

var download = function (url, filename, callback) {
  var p = new Promise(function (resolve, reject) {
    var writeStream = fs.createWriteStream(filename);

    // When it's done resolve
    writeStream.on('finish', function () {
      resolve(filename);
    });

    // Couldn't save the file
    writeStream.on('error', function (err) {
      console.log('write error');
      fs.unlink(filename, reject.bind(null, err));
    });

    var readStream = request.get(url);

    // Couldn't download the file
    readStream.on('error', function (err) {
      console.log('read error');
      fs.unlink(filename, reject.bind(null, err));
    });

    // Pipe the input to the output
    readStream.pipe(writeStream);
  });

  // IF we're not using callbacks, we're using promises
  if (!callback) {
    return p;
  }

  p.then(function (id) {
    callback(null, id);
  }).catch(function (err) {
    callback(err);
  });
};

module.exports = download;
