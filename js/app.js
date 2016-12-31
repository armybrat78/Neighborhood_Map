 //Model of attractions
 var model = [{
         name: 'Kalalau Lookout',
         fact: 'A valley that has beein in multiple films such as Jurrasic Park.',
         location: {
             lat: 22.1492872,
             lng: -159.6372744
         }
     },
     {
         name: 'Puu Hinahina Lookout',
         fact: 'A breathtaking view of the Waimea Canyon.',
         location: {
             lat: 22.1471115,
             lng: -159.6646929
         }
     },
     {
         name: 'Wailua River Lookout',
         fact: 'Views of Kauais River.',
         location: {
             lat: 22.0483333,
             lng: -159.3391667
         }
     },
     {
         name: 'Kumuwela Lookout',
         fact: 'Canyon and waterfall views of the Waimea Canyon.',
         location: {
             lat: 22.1471115,
             lng: -159.6646929
         }
     },
     {
         name: 'Spouting Horn Park',
         fact: 'Two blowholes in the lava-reef rock that erupt.',
         location: {
             lat: 21.88476949999999,
             lng: -159.4932028
         }
     },
     {
         name: 'Opaeka Falls Lookout',
         fact: 'Waterfalls reaching 150 ft.',
         location: {
             lat: 22.048087,
             lng: -159.3617936
         }
     }
 ];

 //create attraction name and title for each attraction in the observable array

 var Attraction = function(data) {
     this.name = ko.observable(data.name);
     this.fact = ko.observable(data.fact);
 };

 //initialize map
 var map;

 var marker;


 //create empty array to hold model markers
 var markers = [];


 function initMap() {
     var kauai = {
         lat: 22.0584376,
         lng: -159.4974082
     };
     map = new google.maps.Map(document.getElementById('map'), {
         center: kauai,
         zoom: 11,
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
     addMarkers();
 }

 function addMarkers() {

     // Limits the map to display attractions on the screen
     var bounds = new google.maps.LatLngBounds();

     //unclicked marker color 
     var markerDefault = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';

     //clicked marker
     var markerSelected = 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png';

     //create an array of markers from the model locations
     for (i = 0; i < model.length; i++) {
         //get the position and name from the model array
         var position = model[i].location;

         var name = model[i].name;

         var fact = model[i].fact;

         //create a marker for each position and add to the empty array
         var marker = new google.maps.Marker({
             map: map,
             icon: markerDefault,
             position: position,
             name: name,
             fact: fact,
             animation: google.maps.Animation.DROP,
             id: i
         });

         //push markers out to array of markers
         markers.push(marker);

         //creates a variable info window
         var infowindow = new google.maps.InfoWindow();

         //add click event to open an info window
         marker.addListener('click', function() {
             fillwindow(this, infowindow);
         });

         //add event listener for mousing over the marker to change the hightlighted color
         marker.addListener('mouseover', function() {
             this.setIcon(markerSelected);
         });
         marker.addListener('mouseout', function() {
             this.setIcon(markerDefault);
         });

         bounds.extend(markers[i].position);
         //make sure all of the markers fit within the map bounds
         map.fitBounds(bounds);

     }

     function fillwindow(marker, info) {
         // Only open one window per marker.
         if (info.marker != marker) {
             info.marker = marker;
             info.setContent('<div>' + marker.name + '</div>' + '<div>' + marker.fact + '</div>');
             info.open(map, marker);
             marker.setIcon(markerSelected);
             // close the marker when the button is clicked.
             info.addListener('closeclick', function() {
                 marker.setIcon(markerDefault);
                 info.setMarker = null;
             });

         }
     }

     function fillMarker(clickedAttraction) {
                 if (info.marker != marker) {
             info.marker = marker;
             info.setContent('<div>' + marker.name + '</div>' + '<div>' + marker.fact + '</div>');
             info.open(map, marker);
             marker.setIcon(markerSelected);
             // close the marker when the button is clicked.
             info.addListener('closeclick', function() {
                 marker.setIcon(markerDefault);
                 info.setMarker = null;
             });
     }

 }
}
 //view model 

 var ViewModel = function() {

     var self = this;

     this.attractionList = ko.observableArray([]);

     model.forEach(function(attractionItem) {
         self.attractionList.push(new Attraction(attractionItem));
     });

     self.currentAttraction = function(clickedAttraction) {
        fillMarker(clickedAttraction)
    };
     

 };

 ko.applyBindings(new ViewModel());
