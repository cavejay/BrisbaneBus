// this is main
var process = require('process');
var request = require('request');
var restify = require('restify');
var util = require('util');
var translink = require('./lib/TranslinkGTFS.js');
var feed = require('./lib/TranslinkFeed.js');

var requestSettings = {
  method: 'GET',
  url: translink.gtfsrt,
  encoding: null
};

request(requestSettings, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    var feed = gtfsrt.FeedMessage.decode(body);
    console.log('passed');
    console.log(util.inspect(feed));
  } else {
    console.log('failed');
  }
});
