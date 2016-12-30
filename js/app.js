//Model of attractions

var initialLocations= [
	{
		name: 'Kalalau Lookout',
		fact: 'A valley that has beein in multiple films such as Jurrasic Park.',
		location:
		[{
			lat: 22.1492872,
			lng: -159.6372744
		}]
	},
	{
		name: 'Puu Hinahina Lookout',
		fact: 'A breathtaking view of the Waimea Canyon.',
		location: 
		[{
			lat: 22.1471115,
			lng: -159.6646929
		}]
	},
		{
		name: 'Wailua River Lookout',
		fact: 'Views of Kauais River.',
		location:
		[{
			lat: 22.0483333,
			lng: -159.3391667
		}]
	},
		{
		name: 'Kumuwela Lookout',
		fact: 'Canyon and waterfall views of the Waimea Canyon.',
		location:
		[{
			lat: 22.1471115,
			lng: -159.6646929
		}]
	},
		{
		name: 'Spouting Horn Park',
		fact: 'Two blowholes in the lava-reef rock that erupt.',
		location:
		[{
			lat: 21.88476949999999,
			lng: -159.4932028
		}]
	},
	{
		name: 'Opaeka Falls Lookout',
		fact: 'Waterfalls reaching 150 ft.',
		location:
		[{
			lat: 22.048087,
			lng: -159.3617936
		}]
	}
];

//create attraction name and title for each attraction in the observable array

var Attraction = function(data) {
	this.name = ko.observable(data.name);
	this.fact = ko.observable(data.fact);
};

//view model 

var ViewModel = function() {
	var self = this;

	//create empty array
	this.attactionList = ko.observableArray([]);

	initialLocations.forEach(function(attractionItem){
      self.attractionList.push( new Attraction(attractionItem) );
    });

	this.currentAttraction = ko.observable( this.attractionList()[0] );

	this.setAttraction = function(clickedAttraction) {
		self.currentAttraction(clickedAttraction);
	};
};

ko.applyBindings(new ViewModel());


//initialize map

var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 22.0584376,lng: -159.4974082},
		zoom: 11
	});
}






