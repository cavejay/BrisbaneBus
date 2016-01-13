# BrisbaneBus API Documentation

---
## Background & Explanation

Queensland's Bus service, Translink, currently publishes its network and realtime network information in Google's gtfs and gtfs realtime formats. These formats are made for machine consumption and thus can provide an entry level barrier for those people looking to harness the data they provide. What's more, the realtime feed is ~500KiB per load, greatly reducing it's usability on mobile devices and due to their limited data supply.

Currently this website & the BrisbaneBus service only supplies realtime information for the Translink network. Rather than users of the feed having to download, decode and parse the gtfsrt feed themselves, they can use the following endpoints to fetch more specific data in easily readable JSON format. The goal is to increase availability of this interesting data supply.

Continued development of this project is being done at [cavejay/BrisbaneBus](http://github.com/cavejay/BrisbaneBus)

## Endpoints
### /routelist

Returns a JSON array containing all the routes with buses currently servicing them.

### /route/:routeid

*NOT IMPLEMENTED YET*

Returns an array of JSON objects providing information on each Bus on the given route.

### /route/:routeid/near/:longitude/:latitude

*NOT IMPLEMENTED YET*

Returns the stop id of the stop closest to provided longitude and latitude.
