var Protobuf = require('protobufjs');
var util = require('util');
var request = require('request');
var EventEmitter = require('events').EventEmitter;
var db = require('gtfs');
var self; // This is for private access to feed
var requestStructure = {
  method: 'GET',
  url: undefined,
  encoding: null
};

function Feed () {
  // if user accidentally omits the new keyword, this will silently correct the problem...
  if (!(this instanceof arguments.callee)) {
    throw new Error('Constructor called as a function');
  }
  EventEmitter.call(this); // Setup the inheritance from EventEmitter

  // public variables
  this.gtfsrt = {};
  this.protoDesc = {};
  this.refreshRate = 15000;
  this.lastKnownGood = {
    time: 0,
    feed: undefined
  };
  this.autoUpdateRunning = true;

  return this;
}
util.inherits(Feed, EventEmitter); // finished the inheritance from EventEmitter

/* Loads the protobuffer
 */
Feed.prototype.setup = function update (feedURL, protoFile) {
  if (!feedURL) throw new Error('Invalid feedURL');
  if (!protoFile) protoFile = './resources/gtfs-realtime.proto';
  this.protoDesc = Protobuf.loadProtoFile(protoFile);

  if (!this.protoDesc) throw new Error('ProtoBuffer Description Loading Failed: ' + this.protoDesc);

  this.gtfsrt = this.protoDesc.build().transit_realtime;
  if (!this.gtfsrt) throw new Error('ProtoBuff Build Failed');

  requestStructure.url = feedURL;
  return this;
};

/* Fetches the realtime feed and stores the current time and the decoded feed
 * in Feed.lastKnownGood
 * Takes an optional callback with signature function(Feed object){}
 */
Feed.prototype.update = function update (callback) {
  var that = this;
  request(requestStructure, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      that.lastKnownGood.feed = that.gtfsrt.FeedMessage.decode(body);
      that.lastKnownGood.time = new Date();
    }
    that.emit('updated');
    if (callback) callback(this);
  });
  return this;
};

Feed.prototype.isOutOfDate = function isOutOfDate () {
  return (this.lastKnownGood.time < (new Date()).getTime() - this.refreshRate);
};

/* Returns information about the vehicles currently active on the network
 */
Feed.prototype.getLiveRouteList = function getLiveRouteList (routeId) {
  var routes = [];
  if (!this.lastKnownGood || !this.lastKnownGood.feed) throw new Error('Missing Feed Data');
  if (this.isOutOfDate()) throw new Error('Feed is out of date');
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

/* returns a list of all possible routes
 * -- THIS CURRENTLY ONLY RETURNS ACTIVE ROUTES FOUND IN THE GTFSRT FEED --
 */
Feed.prototype.getRouteList = function getRouteList () {
  
};

/* Returns the requestStructure used to request the gtfsrt feed */
Feed.prototype.getRequestStructure = function getRequestStructure () { return requestStructure; };

self = new Feed();

exports = module.exports = self;

//            BEGIN NON-FEED FUNCTION AREA

/* Takes an entity and spits out an object with the information we wanted from it
  output = {
    route: 0,
    location: '',
    time till stops: '',
    type: 'bus' or 'train',
  }
  -- CURRENTLY INCOMPLETE --
 */
var processEntityData = function processEntityData (entity) {

};
