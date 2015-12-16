# BrisbaneBus
A Pebble Watch app for Brisbane's Translink Network


## Notes
* Probably won't be able to get the feed straight to the phone. Will have to use a middle man instead.
* http://illogicalbit.com/flero/ has a nice php based solution that would work per bus route for the short term but a nodejs or even ruby server would be good dev experience.
* Watchapp makes calls to the middleman which then either serves it's current data or fetches newer stuff to then pass along.
