/* DB */
cityData = [];

/* Map */
var map;

/* Diagram - Title user checked */
diagram = {
	ru : 'Education',
	rd : 'Transport',
	ld : 'Pnim',
	lu : 'Bitahon'
};

/* Year checked by user */
year = 2014;

zoom = 0;

/* Constant Varriables */
	/* Colors */
	ORANGE = "#fcaa1c";
	GRAY = "#434d53";
	GREEN = "#7bb37f";
	BLUE = "#23959c";
	
	/* Zoom */
	ZOOM_MAX = 5;
	ZOOM_MIN = 0;

$(document).ready(function() {
	/* Mouse-Wheel Handler */
	// Safari
	// parent.addEventListener('mousewheel', mouseWheel, false);
	// // Firefox
	// parent.addEventListener('DOMMouseScroll', mouseWheel, false);
	
	// Create the minimal map
	createMap();
	
	/* load database */
	readFromDatabase();
	
	/* Put All Cities */
	putCities();
	
	/* Create diagram */
	createDiagram();
	
	/* Range Slider Handler */
	rangeSlider_Handler();
	
	/* Radio Buttons Handler */
	radioButtons_Handler();
});
			
function createMap(){
	// Create Map and adjust size
	$("#map").css("height", $(document).height() + 'px');
	//$("#map").css("width", "80%");
	//map = L.map('map').setView([32, 36], 8);
	L.mapbox.accessToken = 'pk.eyJ1IjoiZXJleiIsImEiOiJBcERuZV9rIn0.osZ0ZA6WBNN9-urjHfkccQ#4';
	map = L.mapbox.map('map', 'erez.kpm09np5');
	
	// Add Layers
	addLayers();

	// Show my Marker on map
	showMe();
	
	/* Add layeres to map */
	function addLayers() {
		map.featureLayer.on('ready', function() {
			//var hull = turf.convex(map.featureLayer.getGeoJSON());
			//L.mapbox.featureLayer(hull).addTo(map);
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
        //url: 'includes/cityData.json',
        url: 'includes/ofirData.json',
        async: false,
        success : function(data) {
			for (var i in data) {
				// Build cityData Obj
				cityData.push(data[i]);
			
				/* normalization */
				var max =0;
				
				for (var j=0; j<cityData[i].sums.length; j++){
					//1 Find the height val
					//max= Math.max(cityData[i].sums[j],cityData[i].sum2,cityData[i].sum3,cityData[i].sum4,max);	//max=4236710884
					
					cityData[i].sums/= (3000000000);
					cityData[i].sum2/= (3000000000);
					cityData[i].sum3/= (3000000000);
					cityData[i].sum4/= (3000000000);
				}
				console.log("max="+max);
			}
		}
    });
}

function putCities(){
	for (j in cityData){
		//debugger;
		console.log(cityData[j].latitude+" "+cityData[j].longitude+" "+cityData[j].sum1+" "+cityData[j].sum2+" "+cityData[j].sum3+" "+cityData[j].sum4);
		city(cityData[j].latitude, cityData[j].longitude, [cityData[j].sum1, cityData[j].sum2, cityData[j].sum3, cityData[j].sum4]);
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
	
	for (i=0; i<cityData.length; i++){
		$.each(cityData[i], function(key, val) {
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

function rangeSlider_Handler(){
	//var range = document.mapDataSettingsForm.year;
	$("#year").change(function() {
		year = this.valueAsNumber;
		console.log(year);
	});
}

function radioButtons_Handler(){
	var rad = document.mapDataSettingsForm.mapData;
	var prev = null;
	
	// Show data right after the page is ready
	show_data_on_map(0);
	
	for(var i = 0; i < rad.length; i++) {
	    rad[i].onclick = function() {
	        if(this !== prev) {
	            prev = this;
	            show_data_on_map( parseInt(this.value) );
	        }
	    };
	}
	
	function show_data_on_map(size){
		console.log("show cities in size: "+size);
	}
}




// var mouseWheel = function(e) {
	// var delta = 0;
	// if (e.wheelDelta) {
		// delta = e.wheelDelta;
	// } else if (e.detail) {
		// delta = -e.detail;
	// }
// 
	// if (delta > 0) {
		// console.log('scrolling up !');
		// if (zoom < ZOOM_MAX) {
			// zoom++;
		// }
	// } else if (delta < 0) {
		// console.log('scrolling down !');
		// if (zoom > ZOOM_MIN) {
			// zoom--;
		// }
	// }
	// // cancel page scroll
	// e.preventDefault();
// 	
	// console.log(zoom);
// }; 




