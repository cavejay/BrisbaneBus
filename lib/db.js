var gtfs = require('gtfs');
// var _ = require('underscore');
// var async = require('async');
// var mongoose = require('mongoose');
// var utils = require('../node_modules/gtfs/utils');

// load config.js
// var config;
// try {
//   config = require('../node_modules/gtfs/config.js');
// } catch (e) {
//   try {
//     config = require('../node_modules/gtfs/config-sample.js');
//   } catch (e) {
//     handleError(new Error('Cannot find config.js'));
//   }
// }
//
// function handleError (e) {
//   console.error(e || 'Unknown Error');
//   process.exit(1);
// }
//
// var db = mongoose.connect(config.mongo_url);
// var s = '../node_modules/gtfs'; // to properly mirror the gtfs includes
// require(s + '/models/Agency');
// require(s + '/models/Calendar');
// require(s + '/models/CalendarDate');
// require(s + '/models/FareAttribute');
// require(s + '/models/FareRule');
// require(s + '/models/FeedInfo');
// require(s + '/models/Frequencies');
// require(s + '/models/Route');
// require(s + '/models/Shape');
// require(s + '/models/Stop');
// require(s + '/models/StopTime');
// require(s + '/models/Transfer');
// require(s + '/models/Trip');
// require(s + '/models/Timetable');
// require(s + '/models/TimetableStopOrder');
//
// var Agency = db.model('Agency');
// var Calendar = db.model('Calendar');
// var CalendarDate = db.model('CalendarDate');
// var FeedInfo = db.model('FeedInfo');
// var Route = db.model('Route');
// var Shape = db.model('Shape');
// var Stop = db.model('Stop');
// var StopTime = db.model('StopTime');
// var Trip = db.model('Trip');
// var Timetable = db.model('Timetable');
// var TimetableStopOrder = db.model('TimetableStopOrder');

module.exports = gtfs;
