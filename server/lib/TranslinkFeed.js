var Protobuf = require('protobufjs');
var util = require('util');
var request = require('request');
var EventEmitter = require('events').EventEmitter;

var requestStructure = {
  method: 'GET',
  url: undefined,
  encoding: null
};

function Feed () {
  // if user accidentally omits the new keyword, this will silently correct the problem...
  if (!(this instanceof Feed)) return new Feed();

  EventEmitter.call(this);
}

Feed.gtfsrt = {};
Feed.protoDesc = {};
Feed.lastKnownGood = {
  time: 0,
  feed: undefined
};

util.inherits(Feed, EventEmitter);

/* Loads the protobuffer and does an initial fetching of the realtime feed
 */
Feed.setup = function (feedURL, protoFile) {
  if (!feedURL) throw new Error('Invalid feedURL');
  if (!protoFile) protoFile = '../resources/gtfs-realtime.proto';
  this.protoDesc = Protobuf.loadProtoFile(protoFile);

  if (!this.protoDesc) throw new Error('ProtoBuffer Description Loading Failed');

  this.gtfsrt = this.protoDesc.build().transit_realtime;
  if (!this.gtfsrt) throw new Error('ProtoBuff Build Failed');

  requestStructure.url = feedURL;

  Feed.update();
  return this;
};

/* Fetches the realtime feed and stores the current time and the decoded feed
 * in Feed.lastKnownGood
 */
Feed.update = function () {
  request(requestStructure, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      Feed.lastKnownGood.feed = this.gtfsrt.FeedMessage.decode(body);
      Feed.lastKnownGood.time = new Date();
    }
    Feed.emit('updated');
  });
};

Feed.getRoute = function (routeId) {
}

exports = module.export = new Feed();
