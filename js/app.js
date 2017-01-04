 
//initialize map
var map;
var vm;

 function initMap() {
     var kauai = {
         lat: 22.0584376,
         lng: -159.4974082
     };
     map = new google.maps.Map(document.getElementById('map'), {
         center: kauai,
         zoom: 15,
         scrollwheel: false,
         styles: [{
                 "featureType": "all",
                 "elementType": "labels",
                 "stylers": [{
                         "lightness": 63
                     },
                     {
                         "hue": "#ff0000"
                     }
                 ]
             },
             {
                 "featureType": "administrative",
                 "elementType": "all",
                 "stylers": [{
                         "hue": "#000bff"
                     },
                     {
                         "visibility": "on"
                     }
                 ]
             },
             {
                 "featureType": "administrative",
                 "elementType": "geometry",
                 "stylers": [{
                     "visibility": "on"
                 }]
             },
             {
                 "featureType": "administrative",
                 "elementType": "labels",
                 "stylers": [{
                         "color": "#4a4a4a"
                     },
                     {
                         "visibility": "on"
                     }
                 ]
             },
             {
                 "featureType": "administrative",
                 "elementType": "labels.text",
                 "stylers": [{
                         "weight": "0.01"
                     },
                     {
                         "color": "#727272"
                     },
                     {
                         "visibility": "on"
                     }
                 ]
             },
             {
                 "featureType": "administrative.country",
                 "elementType": "labels",
                 "stylers": [{
                     "color": "#ff0000"
                 }]
             },
             {
                 "featureType": "administrative.country",
                 "elementType": "labels.text",
                 "stylers": [{
                     "color": "#ff0000"
                 }]
             },
             {
                 "featureType": "administrative.province",
                 "elementType": "geometry.fill",
                 "stylers": [{
                     "visibility": "on"
                 }]
             },
             {
                 "featureType": "administrative.province",
                 "elementType": "labels.text",
                 "stylers": [{
                     "color": "#545454"
                 }]
             },
             {
                 "featureType": "administrative.locality",
                 "elementType": "labels.text",
                 "stylers": [{
                         "visibility": "on"
                     },
                     {
                         "color": "#737373"
                     }
                 ]
             },
             {
                 "featureType": "administrative.neighborhood",
                 "elementType": "labels.text",
                 "stylers": [{
                         "color": "#7c7c7c"
                     },
                     {
                         "weight": "0.01"
                     }
                 ]
             },
             {
                 "featureType": "administrative.land_parcel",
                 "elementType": "labels.text",
                 "stylers": [{
                     "color": "#404040"
                 }]
             },
             {
                 "featureType": "landscape",
                 "elementType": "all",
                 "stylers": [{
                         "lightness": 16
                     },
                     {
                         "hue": "#ff001a"
                     },
                     {
                         "saturation": -61
                     }
                 ]
             },
             {
                 "featureType": "poi",
                 "elementType": "labels.text",
                 "stylers": [{
                         "color": "#828282"
                     },
                     {
                         "weight": "0.01"
                     }
                 ]
             },
             {
                 "featureType": "poi.government",
                 "elementType": "labels.text",
                 "stylers": [{
                     "color": "#4c4c4c"
                 }]
             },
             {
                 "featureType": "poi.park",
                 "elementType": "all",
                 "stylers": [{
                     "hue": "#00ff91"
                 }]
             },
             {
                 "featureType": "poi.park",
                 "elementType": "labels.text",
                 "stylers": [{
                     "color": "#7b7b7b"
                 }]
             },
             {
                 "featureType": "road",
                 "elementType": "all",
                 "stylers": [{
                     "visibility": "on"
                 }]
             },
             {
                 "featureType": "road",
                 "elementType": "labels",
                 "stylers": [{
                     "visibility": "off"
                 }]
             },
             {
                 "featureType": "road",
                 "elementType": "labels.text",
                 "stylers": [{
                         "color": "#999999"
                     },
                     {
                         "visibility": "on"
                     },
                     {
                         "weight": "0.01"
                     }
                 ]
             },
             {
                 "featureType": "road.highway",
                 "elementType": "all",
                 "stylers": [{
                         "hue": "#ff0011"
                     },
                     {
                         "lightness": 53
                     }
                 ]
             },
             {
                 "featureType": "road.highway",
                 "elementType": "labels.text",
                 "stylers": [{
                     "color": "#626262"
                 }]
             },
             {
                 "featureType": "transit",
                 "elementType": "labels.text",
                 "stylers": [{
                         "color": "#676767"
                     },
                     {
                         "weight": "0.01"
                     }
                 ]
             },
             {
                 "featureType": "water",
                 "elementType": "all",
                 "stylers": [{
                     "hue": "#0055ff"
                 }]
             }
         ]
     });
 
  vm = new ViewModel();
  ko.applyBindings(vm);

 }

  //create attraction title and title for each attraction object in the observable array

 var Attraction = function(data) {
     this.title = data.title;
     this.fact = data.fact;
     this.lat = data.location.lat;
     this.lng = data.location.lng;
     this.marker = data.marker
     this.wikiTitle = data.wikiTitle;
 };


//create empty array to hold model markers
var markers = [];

 //view model 

 var ViewModel = function() {

     var self = this;

     self.myList = ko.observableArray([]);

     model.forEach(function(item) {
         self.myList.push(new Attraction(item));
     });

     self.currentAttraction = function() {
        fillwindow(this.marker, infowindow);
        toggleBounce(this.marker, marker);
        wikiFill(this.wikiTitle);
    };

     self.filter = ko.observable('');

     //this function executes when the filter is modified- it recomputes every time text is entered
     //into the input. 
    //http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
     self.attractionList = ko.computed(function(){
        var filter = self.filter().toLowerCase();
                //if no filter is entered return the unmodified list
                if(!filter){
                    return self.myList();
                    //if text is entered pass the observable array and function to the function 
                    //if not -1 (ie if there is text present that matches in the array)
                    //return the matching item 'var new Array'
                } else {
                    var newArray =  ko.utils.arrayFilter(self.myList(), function(item){
                        if (item.title.toLowerCase().indexOf(filter) !== -1) {
                            item.marker.setVisible(true);
                            return true;
                        } else {
                            item.marker.setVisible(false);
                            return false;
                        }
                    });

                        return newArray;
                }
            });

    self.articleList = ko.observableArray([]); 

    function article(content, url) {
        var self = this;
        self.content = content;
        self.url = url;
    }

     wikiFill = function(wikiTitle){ 
        
        //clear content before loading new
        self.articleList.removeAll();

        // If the wikiRequest times out, then display a message with a link to the Wikipedia page.
        var wikiRequestTimeout = setTimeout(function() {
            alert("Wikipedia API could not be reached");
            
        }, 3000); //3000 sets error handling message to be displayed after 3 seconds

        wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + wikiTitle + '&format=json&callback=wikiCallback';

            $.ajax({
            url: wikiUrl,
            dataType:'jsonp',
            success: function(response) {

                 self.articleList.removeAll();

                 articleList = response[1];

                    articleStr = articleList[0];
                    var url = 'https://en.wikipedia.org/wiki/' + articleStr;
                    self.articleList.push(new article(articleStr, url));
                
                    clearTimeout(wikiRequestTimeout);
                }
              

    });
}

// Limits the map to display attractions on the screen
     var bounds = new google.maps.LatLngBounds();

     //unclicked marker color 
     var markerDefault = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';

     //clicked marker
     var markerSelected = 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png';

     //create an array of markers from the model locations
     for (i = 0; i < self.myList().length; i++) {
         //get the position and title from the model array
         var position = new google.maps.LatLng(self.myList()[i].lat, self.myList()[i].lng);

         var title = self.myList()[i].title;

         var fact = self.myList()[i].fact;

         var wikiTitle = self.myList()[i].wikiTitle;
         console.log(wikiTitle);

         //create a marker for each position and add to the empty array
         var marker = new google.maps.Marker({
             map: map,
             icon: markerDefault,
             position: position,
             title: title,
             fact: fact,
             wikiTitle: wikiTitle,
             animation: google.maps.Animation.DROP,
             id: i
         });

         //push markers out to array of markers
         markers.push(marker);

         //save the marker to the object
         self.myList()[i].marker = marker;

         //creates a variable info window
         var infowindow = new google.maps.InfoWindow();

         //add click event to open an info window
         marker.addListener('click', function() {
             fillwindow(this, infowindow);
             toggleBounce(this, marker);
             wikiFill(this.wikiTitle);
         });

         //add event listener for mousing over the marker to change the hightlighted color
         marker.addListener('mouseover', function() {
             this.setIcon(markerSelected);
         });
         marker.addListener('mouseout', function() {
             this.setIcon(markerDefault);
         });

         function toggleBounce(marker) {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                 marker.setAnimation(google.maps.Animation.null);
                }, 2000);
            };
         

         bounds.extend(markers[i].position);
         //make sure all of the markers fit within the map bounds
         map.fitBounds(bounds);

     }

     function fillwindow(marker, info) {
         // Only open one window per marker.
         if (info.marker != marker) {
             infowindow.setContent('');
             info.marker = marker;
             //change the marker color when clicked 
             marker.setIcon(markerSelected);
             // close the marker when the button is clicked and change color back to default
             info.addListener('closeclick', function() {
                 marker.setIcon(markerDefault);
                 info.setMarker = null;
             });

            var streetViewService = new google.maps.StreetViewService();
            var radius = 50;
            // function to load the street view first checks the google status for loading the pano then calculates the heading
            function getStreetView(data, status) {
                if (status == google.maps.StreetViewStatus.OK) {
                    var nearStreetViewLocation = data.location.latLng;
                    var heading = google.maps.geometry.spherical.computeHeading(
                    nearStreetViewLocation, marker.position);
                    infowindow.setContent('<div>' + marker.title +'</div>' + '<div>' + marker.fact + '</div>'+ '<div id="thumbnail"></div>');
                    var panoramaOptions = {
                        position: nearStreetViewLocation,
                        pov: {
                            heading: heading,
                            pitch: 15
                  }
                };
                    var panorama = new google.maps.StreetViewPanorama(
                    document.getElementById('thumbnail'), panoramaOptions);
                } else {
                  infowindow.setContent('<div>' + marker.title + '</div>' +
                  '<div>No Street View Found</div>');
                }
            }
            // radius is set to 50 so the streetview will load the closest possible view within radius
            streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
            // Opens the window on the marker.
            infowindow.open(map, marker);
        }
    }
  
 };

 function googleError(){
  alert("At this time we are unable to load Google Maps");
}


