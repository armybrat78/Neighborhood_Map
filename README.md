# Neighborhood_Map

### Overview

As a part of [Udacity's](http://www.udacity.com) Front-end Web Developer Nanodegree I was challenged to create a single-page application of a neighborhood I would like to visit utilizing Knockout and third-party APIs.

### Getting Started

##### The Map

My live version is linked [here](https://megdollar.github.io/Neighborhood_Map/)
This is a link to my GitHub [repo](https://github.com/megdollar/Neighborhood_Map)

### Optimization

#### Index Page

The index page orginially had a [Google Page Speed Insights](https://developers.google.com/speed/pagespeed/insights/) score of XX/100 mobile and XX/100 desktop. After implementing the following optimizations I was able to achieve a score of XX/100 on mobile and XX/100 on desktop.

###### JavaScript
Minified the Javascript using this [tool](https://javascript-minifier.com/) and added the [async](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) attribute to all script tags.

###### CSS
Minified the CSS using this [tool](https://cssminifier.com/) and inlined it as well.  

#### Framework

###### Knockout 

[Knockout](http://knockoutjs.com/documentation/introduction.html) was utilized to dynamically update the app.

###### MVVM

[Model View ViewModel](https://msdn.microsoft.com/en-us/library/hh848246.aspx) was implemented providing a separation of concerns to make the application easire to maintain and use.

#### APIs

###### Google Maps

[Google Maps](https://developers.google.com/maps/documentation/javascript/) was implemented to showcase different locations as well as markers, streetview, and panorama.

###### Wikipedia

The [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) was implemented to add linked information for each Attraction on the list, via an AJAX request.

#### Udacity coursework inspirations

###### Cat-clicker

The [Cat-clicker](https://github.com/udacity/ud989-cat-clicker-ko-starter) mini-lesson provided tutorial for utilizing Knockout.

###### AJAX

In this [AJAX](https://www.udacity.com/api/nodes/3180658597/supplemental_media/udacity-ajax-initzip/download) mini course a static page was created and utilized the Wikipedia API.

###### Google Maps API

The [Google Maps API](https://github.com/udacity/ud864) course had a plethora of information that I was able to implement for this project
