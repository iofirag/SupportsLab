/* DB */
cityData = [];

/* Map */
var map;
var assetLayerGroup_0;
var assetLayerGroup_1;
var assetLayerGroup_2;

/* Diagram - Title user checked */
diagram = {
	ru : 'Education',
	rd : 'Transport',
	ld : 'Pnim',
	lu : 'Bitahon'
};

/* Year checked by user */
year_ToShow = 2014;

/* Places To Show */
places_ToShow = 0;

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
	/******************** Adjust Map tag size ***************************/
	$("#map").css("height", $(window).height()-20 + 'px');
	
	$(window).resize(function() {
		$("#map").css("height", $(window).height()-20 + 'px');
		map.panTo(new L.LatLng(31.5, 36));
	});
	
	
	
	
	/******************** Add Map ****************************************************************/
	// Us
	/* L.mapbox.accessToken = 'pk.eyJ1IjoiZXJleiIsImEiOiJBcERuZV9rIn0.osZ0ZA6WBNN9-urjHfkccQ#4';
	map = L.mapbox.map('map', 'erez.kpm09np5').setView([31.5, 36], 8); */
	
	// General - (hebrew+arabic)
	/*L.mapbox.accessToken = 'pk.eyJ1IjoiaW9maXJhZyIsImEiOiJ6bFRjUlJ3In0.wnfOTbaAq0r1bsia3puGRg';
	map = L.mapbox.map('map', 'examples.map-i86nkdio').setView([31.5, 36], 8); */
	
	map = new L.Map('map', {
	    center: new L.LatLng(31.5, 36),
	    zoom: 8,
	    layers: [
	        L.tileLayer('http://{s}.www.toolserver.org/tiles/osm-no-labels/{z}/{x}/{y}.png')
	        // L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg')
	    ]
	});
	
	/********** Control on Map-Zoom Events *************/
	map.on('zoomend', function(e) {
	    console.log("zoomend"+" "+map.getZoom());
	});
	
	
	assetLayerGroup_0 = new L.LayerGroup();	
	assetLayerGroup_1 = new L.LayerGroup();	
	assetLayerGroup_2 = new L.LayerGroup();			
	
	
	// Show my Marker on map
	showMe();

	/* Get User-location & show it */
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
				
				/* normalization */
				var max =0;
				debugger;
				switch (data[i].type){
				case 0:	// Big
					break;
				case 1:	// Normal
					break;
				case 2:	// Small
					break;
				}
				//for (var j=0; j<cityData[i].sums.length; j++){
					//1 Find the height val
					//max= Math.max(cityData[i].sums[j],cityData[i].sum2,cityData[i].sum3,cityData[i].sum4,max);	//max=4236710884
					
					//cityData[i].sums/= (3000000000);
					//cityData[i].sum2/= (3000000000);
					//cityData[i].sum3/= (3000000000);
					//cityData[i].sum4/= (3000000000);
				//}
				
				// Build cityData Obj
				cityData.push(data[i]);
				
				console.log("max="+max);
			}
		}
    });
}

function putCities(){
	//assetLayerGroup_0.clearLayers();
	
	for (i in cityData){
		// find places that theyer size - like user checked
		if (cityData[i].type == places_ToShow){
			//debugger;
			// Put cities data in 4 rectangles
			// find the data about the year - like user checked
			for(k in cityData[i].sums){
				//debugger;
				if (cityData[i].sums[k].year == year_ToShow){
					
					var city_toShow = {
						latitude: 0,
						longitude: 0,
						ru: 0,
						rd: 0,
						ld: 0,
						lu: 0
					};
					
					city_toShow.latitude = cityData[i].latitude;
					city_toShow.longitude = cityData[i].longitude;
					
					// find the 4 things to show - like user checked
					$.each(cityData[i].sums[k], function(key, val) {
						//show city rectangles data by lat-lng and value
							// cityData[i].latitude
							// cityData[i].longitude
							// val
						//debugger;
						switch (key){
						case diagram.ru: city_toShow.ru = val;
							break;
						case diagram.rd: city_toShow.rd = val;
							break;
						case diagram.ld: city_toShow.ld = val;
							break;
						case diagram.lu: city_toShow.lu = val;
							break;
						}
					});
					city(city_toShow);
					break;
				}
				//console.log(cityData[j].latitude+" "+cityData[j].longitude+" "+cityData[j].sum1+" "+cityData[j].sum2+" "+cityData[j].sum3+" "+cityData[j].sum4);
				//city(cityData[j].latitude, cityData[j].longitude, [cityData[j].sum1, cityData[j].sum2, cityData[j].sum3, cityData[j].sum4]);
			}
			
			//Put cities
			var circle = L.circle([cityData[i].latitude, cityData[i].longitude], 2000, {
			    color: 'red',
			    fillColor: '#f03',
			    fillOpacity: 0.5
			});
			circle.bindPopup(cityData[i].name);
			
			// Create an Layer-Group (use for fast remove all of them)
			assetLayerGroup.addLayer(circle);
		}
		assetLayerGroup.addTo(map);
	}
	
	function city(city_toShow){
		rectangles(city_toShow.latitude, city_toShow.longitude,	city_toShow.ru, 'ru');
		rectangles(city_toShow.latitude, city_toShow.longitude,	city_toShow.rd, 'rd');
		rectangles(city_toShow.latitude, city_toShow.longitude,	city_toShow.ld, 'ld');
		rectangles(city_toShow.latitude, city_toShow.longitude,	city_toShow.lu, 'lu');
	}
	function rectangles(lat,lon,dist,recNum){
		switch (recNum){
		case 'ru':	//ru
			// A - define rectangle geographical bounds
			var bounds = [[lat, lon], [lat+(dist), lon+(dist)]];
			// create an orange rectangle
			L.rectangle(bounds, {color: ORANGE, weight: 7}).addTo(map);
			break;
		case 'rd':	//rd
			// B - define rectangle geographical bounds
			var bounds = [[lat, lon], [lat-(dist), lon+(dist)]];
			// create an orange rectangle
			L.rectangle(bounds, {color: GRAY, weight: 7}).addTo(map);
			break;
		case 'ld':	//ld
			// C - define rectangle geographical bounds
			var bounds = [[lat, lon], [lat-(dist), lon-(dist)]];
			// create an orange rectangle
			L.rectangle(bounds, {color: GREEN, weight: 7}).addTo(map);
			break;
		case 'lu':	//lu
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
		year_ToShow = this.valueAsNumber;
		//console.log(year_ToShow);
		
		putCities();
	});
}

function radioButtons_Handler(){
	var rad = document.mapDataSettingsForm.mapData;
	var prev = null;
	
	// Show data right after the page is ready
	putCities();
	
	for(var i = 0; i < rad.length; i++) {
	    rad[i].onclick = function() {
	        if(this !== prev) {
	            prev = this;
	            //show_data_on_map( parseInt(this.value) );
	            places_ToShow = this.value;
	            
	            putCities();
	        }
	    };
	}
	
	function show_data_on_map(size){
		console.log("show cities in size: "+size);
	}
}