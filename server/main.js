// this is main
var restify = require('restify');
var feed = require('./lib/TranslinkFeed.js');
var translink = require('./lib/TranslinkGTFS.js');

// Setup the parser
feed.setup(translink.gtfsrt);

feed.on('updated', function () {
  console.log('Feed was updated at ' + feed.lastKnownGood.time);
});

var server = restify.createServer({
  name: 'BrisbaneBus'
});

server.get('/hello/:name', function (req, res, next) {
  res.send('Hello ' + req.params.name);
});

server.get('/route/:routeid', function (req, res, next) {
  res.send('Getting route: ' + req.params.routeid);
});

server.get('/routelist', function (req, res, next) {
  res.send(feed.getRouteList());
  console.log('served route list');
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
