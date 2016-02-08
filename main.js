var restify = require('restify');
var feed = require('./lib/TranslinkFeed.js');
var translink = require('./lib/TranslinkGTFS.js');
var web = require('./lib/web.js');

console.log('Setting up Feed parser');
feed.setup(translink.gtfsrt);

// Start listening to it's events
feed.on('updated', function () {
  console.log('Feed was updated at ' + feed.lastKnownGood.time);
});

// Setup the server
var server = restify.createServer({
  name: 'BrisbaneBus'
});

server.use(function catchAll (req, res, next) {
  // If we're req'ing for the homepage let it pass through.
  if (req.url === '/') {
    next();
  } else if (feed.isOutOfDate()) {
    feed.update(function ifOutOfDate (f) {
      next();
    });
  } else {
    next();
  }
});

/* Server endpoints */
server.get('/', web.serveIndex);
server.get('/index.html', web.serveIndex);

server.get('/route/:routeid', function (req, res, next) {
  res.send('Getting route: ' + req.params.routeid);
});

server.get('/routelist', function (req, res, next) {
  res.send(feed.getRouteList());
  console.log('Served route list');
});

// Start the server
server.listen(4000, function () {
  console.log('%s listening at %s', server.name, server.url);
});
