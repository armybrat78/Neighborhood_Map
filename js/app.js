
//initialize map
var map, vm;

 function initMap() {
     var kauai = {
         lat: 22.0584376,
         lng: -159.4974082
     };
     map = new google.maps.Map(document.getElementById('map'), {
         center: kauai,
//         zoom: 20,
         scrollwheel: false,
         mapTypeControl: true,
         mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
         styles: [
    {
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#f49f53"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#f9ddc5"
            },
            {
                "lightness": -7
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 43
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "color": "#645c20"
            },
            {
                "lightness": 38
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#1994bf"
            },
            {
                "saturation": -69
            },
            {
                "gamma": 0.99
            },
            {
                "lightness": 43
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f19f53"
            },
            {
                "weight": 1.3
            },
            {
                "visibility": "on"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi.business"
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "color": "#645c20"
            },
            {
                "lightness": 39
            }
        ]
    },
    {
        "featureType": "poi.school",
        "stylers": [
            {
                "color": "#a95521"
            },
            {
                "lightness": 35
            }
        ]
    },
    {},
    {
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 38
            },
            {
                "visibility": "off"
            }
        ]
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {
        "elementType": "labels"
    },
    {
        "featureType": "poi.sports_complex",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "lightness": 32
            }
        ]
    },
    {},
    {
        "featureType": "poi.government",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "lightness": 46
            }
        ]
    },
    {
        "featureType": "transit.station",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 22
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "lightness": 38
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#f19f53"
            },
            {
                "lightness": -10
            }
        ]
    },
    {},
    {},
    {}
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
     this.marker = data.marker;
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
                    //show all markers if no input
                    self.myList().forEach(function(item){
                        if (item.marker) {
                            item.marker.setVisible(true);
                        }
                    });
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


        // If the wikiRequest times out, then display a message with a link to the Wikipedia page.
        var wikiRequestTimeout = setTimeout(function() {
            alert("Wikipedia API could not be reached");
            
        }, 3000); //3000 sets error handling message to be displayed after 3 seconds

        wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + wikiTitle + '&format=json&callback=wikiCallback';

            $.ajax({
            url: wikiUrl,
            dataType:'jsonp',
            success: function(response) {

                //clear content 
                 self.articleList.removeAll();

                 articleList = response[1];

                    articleStr = articleList[0];
                    var url = 'https://en.wikipedia.org/wiki/' + articleStr;
                    self.articleList.push(new article(articleStr, url));
                
                    clearTimeout(wikiRequestTimeout);
                }
              

    });
};

// Limits the map to display attractions on the screen
     var bounds = new google.maps.LatLngBounds();

     //unclicked marker color 
     var markerDefault = 'images/map-marker24.ico';

     //create an array of markers from the model locations
     for (i = 0; i < self.myList().length; i++) {
         //get the position and title from the model array
         var position = new google.maps.LatLng(self.myList()[i].lat, self.myList()[i].lng);

         var title = self.myList()[i].title;

         var fact = self.myList()[i].fact;

         var wikiTitle = self.myList()[i].wikiTitle;

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


         function toggleBounce(marker) {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                 marker.setAnimation(google.maps.Animation.null);
                }, 2000);
            }
         

         bounds.extend(markers[i].position);
         //make sure all of the markers fit within the map bounds
         map.fitBounds(bounds);

     }

     function fillwindow(marker, info) {
         // Only open one window per marker.
         if (info.marker != marker) {
             infowindow.setContent('');
             info.marker = marker;
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
                    infowindow.setContent('<div id="google-title">' + marker.title +'</div>' + '<div id="google-fact">' + marker.fact + '</div>'+ '<div id="thumbnail"></div>');
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
                  infowindow.setContent('<div id="google-title">' + marker.title + '</div>' +
                  '<div id="google-fact">No Street View Found</div>');
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


