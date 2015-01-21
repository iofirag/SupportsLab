/* DB */
townsData = [];

/* Map */
var map;

/* Diagram - Title user checked */
diagram = {
		a : 'sum1',
		b : 'sum2',
		c : 'sum3',
		d : 'sum4'
};

/* Colors */
ORANGE = "#fcaa1c";
GRAY = "#434d53";
GREEN = "#7bb37f";
BLUE = "#23959c";

$(document).ready(function() {
	// Create the minimal map
	createMap();
	
	/* load database */
	readFromDatabase();
	
	/* Put All Cities */
	putCities();
	
	/* Radio Buttons Handler */
	radioButtons_Handler();
	
	/* Create diagram */
	createDiagram();
});
			
function createMap(){
	// Create Map and adjust size
	$("#map").css("height", $(document).height() + 'px');
	//$("#map").css("width", "80%");
	map = L.map('map').setView([32, 36], 8);
	
	// Add Layers
	addLayers2();

	// Show my Marker on map
	showMe();
	
	/* Add layeres to map */
	function addLayers() {
		L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			maxZoom : 18,
			//attribution : 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id : 'examples.map-i875mjb7'
		}).addTo(map);
	}
	function addLayers2() {

		L.mapbox.accessToken = '<your access token here>';
		// Replace 'examples.map-i87786ca' with your map id.
		var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			attribution : '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>',
			id : 'erez.kpm09np5'
		}).addTo(map); 

		L.tileLayer('a.tiles.mapbox.com/v4//{id}/{z}/{x}/{y}.png', { //pk.eyJ1IjoiZXJleiIsImEiOiJBcERuZV9rIn0.osZ0ZA6WBNN9-urjHfkccQ#7
			//maxZoom : 18,
			//attribution : 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id : 'erez.kpm09np5'
		}).addTo(map);
	}
	/* Get location & show it */
	function showMe() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
	}
	function showPosition(position) {
		L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
	}
}

function readFromDatabase(){
	$.ajax({
        type: "GET",
        url: 'includes/townsData.json',
        async: false,
        success : function(data) {
			for (var i in data) {
				townsData.push(data[i]);
			}
			
			/* normalization */
			var max =0;
			for (var i=0; i<townsData.length; i++){
				//1 Find the hight val
				max= Math.max(townsData[i].sum1,townsData[i].sum2,townsData[i].sum3,townsData[i].sum4,max);	//max=4236710884
				//var counter=0;
				
				townsData[i].sum1/= (3000000000);
				townsData[i].sum2/= (3000000000);
				townsData[i].sum3/= (3000000000);
				townsData[i].sum4/= (3000000000);
				
				//2 Divide it with 10 untill it less then 20 (save how many times divided)
				// while (max>20){ 
					// max/=10;
					// counter++;
				// }
				
				//3 Divide all other with same number
				/*for (j=0; j<counter; j++){
					townsData[i].sum1/= (10);
					townsData[i].sum2/= (10);
					townsData[i].sum3/= (10);
					townsData[i].sum4/= (10);
				}*/
			}
			console.log("max="+max);
		}
    });
}

function putCities(){
	for (j in townsData){
		console.log(townsData[j].latitude+" "+townsData[j].longitude+" "+townsData[j].sum1+" "+townsData[j].sum2+" "+townsData[j].sum3+" "+townsData[j].sum4);
		city(townsData[j].latitude, townsData[j].longitude, [townsData[j].sum1, townsData[j].sum2, townsData[j].sum3, townsData[j].sum4]);
	}
	
	function city(lat,lon,dist){
		for (i=0; i<4; i++){
			rectangles(lat,lon,	dist[i], i);
		}
	}
	function rectangles (lat,lon,dist,type){
		switch (type){
		case 0:
			// A - define rectangle geographical bounds
			var bounds = [[lat, lon], [lat+(dist), lon+(dist)]];
			// create an orange rectangle
			L.rectangle(bounds, {color: ORANGE, weight: 7}).addTo(map);
			break;
		case 1:
			// B - define rectangle geographical bounds
			var bounds = [[lat, lon], [lat-(dist), lon+(dist)]];
			// create an orange rectangle
			L.rectangle(bounds, {color: GRAY, weight: 7}).addTo(map);
			break;
		case 2:
			// C - define rectangle geographical bounds
			var bounds = [[lat, lon], [lat-(dist), lon-(dist)]];
			// create an orange rectangle
			L.rectangle(bounds, {color: GREEN, weight: 7}).addTo(map);
			break;
		case 3:
			// D - define rectangle geographical bounds
			var bounds = [[lat, lon], [lat+(dist), lon-(dist)]];
			// create an orange rectangle
			L.rectangle(bounds, {color: BLUE, weight: 7}).addTo(map);
			break;
		}
	}
}

function createDiagram(){
	var centerPos = 100;
	var diagramContainer = d3.select('#diagram').append("svg").append("g");
	var diagramCounter = {
		a : 0,
		b : 0,
		c : 0,
		d : 0
	};
	
	for (i=0; i<townsData.length; i++){
		$.each(townsData[i], function(key, val) {
			if (key == diagram.a) diagramCounter.a+= val;
			else if (key == diagram.b) diagramCounter.b+= val; 
			else if (key == diagram.c) diagramCounter.c+= val; 
			else if (key == diagram.d) diagramCounter.d+= val;
		});
	}
	
	var circleAttributes = diagramContainer.append("rect")	//1- ORANGE
			.attr("x", centerPos)
			.attr("y", centerPos-diagramCounter.a)
			.attr("width", diagramCounter.a)
			.attr("height", diagramCounter.a)
			.style("fill", ORANGE);
		
		var circleAttributes = diagramContainer.append("rect")	//2- GRAY
			.attr("x", centerPos)
			.attr("y", centerPos)
			.attr("width", diagramCounter.b)
			.attr("height", diagramCounter.b)
			.style("fill", GRAY);

		var circleAttributes = diagramContainer.append("rect")	//3- GREEN
			.attr("x", centerPos-diagramCounter.c)
			.attr("y", centerPos)
			.attr("width", diagramCounter.c)
			.attr("height", diagramCounter.c)
			.style("fill", GREEN);

		var circleAttributes = diagramContainer.append("rect")	//4- BLUE
			.attr("x", centerPos-diagramCounter.d)
			.attr("y", centerPos-diagramCounter.d)
			.attr("width", diagramCounter.d)
			.attr("height", diagramCounter.d)
			.style("fill", BLUE);
}

function radioButtons_Handler(){
	var rad = document.mapDataSettingsForm.mapData;
	var prev = null;
	for(var i = 0; i < rad.length; i++) {
	    rad[i].onclick = function() {
	        //(prev)? null:null;
	        if(this !== prev) {
	            prev = this;
	        }
	        console.log(this.value);
	    };
	}
}
