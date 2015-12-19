var Protobuf = require('protobufjs');
var util = require('util');
var request = require('request');
var EventEmitter = require('events').EventEmitter;

var requestStructure = {
  method: 'GET',
  url: undefined,
  encoding: null
};

/* Takes an entity and spits out an object with the information we wanted from it
  output = {
    route: 0,
    location: '',
    time till stops: '',
  }
 */
var processEntityData = function graEntityData (entity) {

};

function Feed () {
  // if user accidentally omits the new keyword, this will silently correct the problem...
  if (!(this instanceof arguments.callee)) {
    throw new Error('Constructor called as a function');
  }
  EventEmitter.call(this);

  this.gtfsrt = {};
  this.protoDesc = {};
  this.lastKnownGood = {
    time: 0,
    feed: undefined
  };

  return this;
}

util.inherits(Feed, EventEmitter);

/* Loads the protobuffer and does an initial fetching of the realtime feed
 */
Feed.prototype.setup = function update (feedURL, protoFile) {
  if (!feedURL) throw new Error('Invalid feedURL');
  if (!protoFile) protoFile = './resources/gtfs-realtime.proto';
  this.protoDesc = Protobuf.loadProtoFile(protoFile);

  if (!this.protoDesc) throw new Error('ProtoBuffer Description Loading Failed: ' + this.protoDesc);

  this.gtfsrt = this.protoDesc.build().transit_realtime;
  if (!this.gtfsrt) throw new Error('ProtoBuff Build Failed');

  requestStructure.url = feedURL;

  this.update();
  return this;
};

/* Fetches the realtime feed and stores the current time and the decoded feed
 * in Feed.lastKnownGood
 */
Feed.prototype.update = function update () {
  var self = this;
  request(requestStructure, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      self.lastKnownGood.feed = self.gtfsrt.FeedMessage.decode(body);
      self.lastKnownGood.time = new Date();
    }
    self.emit('updated');
  });
  return this;
};

Feed.prototype.getRoute = function getRoute (routeId) {
  return this;
};

Feed.prototype.getRouteList = function getRouteList () {
  var routes = [];
  if (!this.lastKnownGood || !this.lastKnownGood.feed) throw new Error('Missing Feed Data');
  this.lastKnownGood.feed.entity.forEach(function (ent) {
    if (ent.vehicle && ent.vehicle.position) {
      var r = ent.vehicle.trip.route_id.split('-')[0];
      if (routes.indexOf(r) === -1) {
        routes.push(r);
      }
    }
  });
  return routes;
};

Feed.prototype.getRequestStructure = function getRequestStructure () { return requestStructure; };

exports = module.exports = new Feed();
