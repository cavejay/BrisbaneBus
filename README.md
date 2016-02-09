# BrisbaneBus API Documentation

---
## Background & Explanation

Queensland's Bus service, Translink, currently publishes its network and realtime network information in Google's gtfs and gtfs realtime formats. These formats are made for machine consumption and thus can provide an entry level barrier for those people looking to harness the data they provide. What's more, the realtime feed is ~500KiB per load, greatly reducing it's usability on mobile devices and due to their limited data supply.

Currently this website & the BrisbaneBus service only supplies realtime information for the Translink network. Rather than users of the feed having to download, decode and parse the gtfsrt feed themselves, they can use the following endpoints to fetch more specific data in easily readable JSON format. The goal is to increase availability of this interesting data supply.

Continued development of this project is being done at [cavejay/BrisbaneBus](http://github.com/cavejay/BrisbaneBus)

## Endpoints
### /routelist

Returns a JSON array of all the routes in the network

### /routelist/live

Returns a JSON array containing all the routes with buses currently servicing them.

### /route/:routeid

*NOT IMPLEMENTED YET*

Returns an array of JSON objects providing information on each Bus on the given route.

### /route/:routeid/near/:longitude/:latitude

*NOT IMPLEMENTED YET*

Returns the stop id of the stop closest to provided longitude and latitude.

## Installation

This service requires that you have access to a MongoDB instance.  
 1. Clone this repo. `git clone https://github.com/cavejay/BrisbaneBus.git`
 2. `cd BrisbaneBus && npm install .`
 3. Open resources/config.js with a text editor and correct line 7 to point to your preferred mongo instance. The default setting is to use a local instance.
 4. place the config.js file by running. `cp resources/config.js node_modules/gtfs/config.js`
 5. `node /bin/gtfsSetup.js` handles the downloading and loading into MongoDB of the Translink GTFS data. This will take *very* long time, about 20 minutes.
 6. `node main.js` or `npm start` can be used to start the server.
 7. If the server is to be run in a headless environment it's recommended to install pm2, a node process manager. This command will install and start pm2 for this server `npm install -g pm2 && pm2 start main.js`.
