// this is main
var restify = require('restify');
var feed = require('./lib/TranslinkFeed.js');
var fs = require('fs');
var translink = require('./lib/TranslinkGTFS.js');
var marked = require('marked');

// Load index page
var indexPage = fs.readFileSync('README.md', 'utf8');

// Setup the parser
feed.setup(translink.gtfsrt);

feed.on('updated', function () {
  console.log('Feed was updated at ' + feed.lastKnownGood.time);
});

var server = restify.createServer({
  name: 'BrisbaneBus'
});

// Converts the README to HTML and serves it
var serveIndex = function serveIndex (req, res, next) {
  var body = marked(indexPage);
  res.writeHead(200, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/html'
  });
  res.write(body);
  res.end();
};

server.get('/', serveIndex);
server.get('/index.html', serveIndex);

server.get('/route/:routeid', function (req, res, next) {
  res.send('Getting route: ' + req.params.routeid);
});

server.get('/routelist', function (req, res, next) {
  res.send(feed.getRouteList());
  console.log('Served route list');
});

server.listen(4000, function () {
  console.log('%s listening at %s', server.name, server.url);
});
