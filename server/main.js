// this is main
var restify = require('restify');
var util = require('util');
var translink = require('./lib/TranslinkGTFS.js');
var feed = require('./lib/TranslinkFeed.js').setup(translink.gtfsrt);

var server = restify.createServer({
  name: 'BrisbaneBus'
});

server.get('/hello/:name', function (req, res, next) {
  res.send('Hello ' + req.params.name);
});

server.get('/route/:routeid', function (req, res, next) {
  res.send('Getting route: ' + req.params.routeid);
  feed.update();
});

server.get('/routelist', function (req, res, next) {
  res.send('Getting list of Buses');
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

feed.on('updated', function () {
  
})
