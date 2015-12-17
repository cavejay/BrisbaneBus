var Protobuf = require('protobufjs');

var Feed = {
	gtfsrt: {},
	protoDesc: {}
};

Feed.setup = function (feedURL, protoFile) {
  if (!protoFile) protoFile = 'resources/gtfs-realtime.proto';
  this.protoDesc = Protobuf.loadProtoFile(protoFile);

  if (!this.protoDesc) throw new Error('Could not create Protobuffer from file');

  this.gtfsrt = this.protoDesc.build().transit_realtime;
  if (this.gtfsrt) console.log('gtfsrt:\n' + util.inspect(gtfsrt));
  else {
    console.log('things failed :(');
    process.exit();
  }
  return this;
};

Feed.update = function () {

};

exports = module.export = Feed;
