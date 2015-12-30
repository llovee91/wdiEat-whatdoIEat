# wdiEat
Wdi(what do I)Eat is an app that helps users make a very important life decision: What they eat for their next meal!

This app uses the Yelp API to return a random restaurant based on parameters set by the user. The app can also provide a completely random result if no parameters are chosen.

### Technologies/Frameworks
wdiEat was built using HTML, CSS, Bootstrap, Javascript, JQuery library, Node and Express libraries, and MongoDB.

### Third Party APIs
1. Geolocation: geolocation was used to get the current location of the user. However, geolocation requires permissions from users so it would fail if a user denies to share their location.
2. Freegeoips: POST request was made to freegeoip to obtain an estimated longitude, latitude and city of the user’s current location. Freegeoips does not require permission from the user thus it was used as a backup in case if a user denies to share their location.
3. Yelp: GET request was made to Yelp to obtain a list of restaurants that best match the user’s needs.

# Wireframe
![alt tag](https://raw.githubusercontent.com/llovee91/wdiEat-whatdoIEat/master/public/images/wireframe.png)

#User Stories
1. As a user, I want to find a place to eat that's close to me, without having to make my own decisions
2. As a user, I’d like the choice to provide input to the decision
3. As a user, I want to view the main page without logging in
4. As a user, once I’ve found the place to eat, I want to know basic information about it such as address, location, contact info, reviews etc.
5. As a user, if I don’t like the eatery chosen for me, I would like to the chance to try again

###Future Implementation
1. A more accurate location service/api should be implemented in case a user declines to "share location" or a user is using a browser that does not support geolocation
