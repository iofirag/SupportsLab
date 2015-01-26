/* DB */
cityData = [];

/* Map */
var map;
var assetLayerGroup_big;
var assetLayerGroup_middle;
var assetLayerGroup_small;

/* Diagram - Title user checked */
var diagram = {
	ru : 'Education',
	rd : 'Transport',
	ld : 'Pnim',
	lu : 'Bitahon'
};
var diagramMax = 220; 

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

	STEP_LAT = 0.04;
	STEP_LON = 0.05;

//********************************************************************************************

$(document).ready(function() {
	/* Create map */
	createMap();

	/* load database & build 3 data layers */
	readFromDatabase();
	
	/* Create diagram */
	createDiagram();
	
	/* Handler */
		// Range Slider Handler
		rangeSlider_Handler();
		
		// Radio Buttons Handler
		radioButtons_Handler();
		
	/* Show places */
	putCities();
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
	L.mapbox.accessToken = 'pk.eyJ1IjoiZXJleiIsImEiOiJBcERuZV9rIn0.osZ0ZA6WBNN9-urjHfkccQ#8';
	map = L.mapbox.map('map', 'erez.l1l22p98').setView([31.5, 36], 8);
	
	
	// initiate data layer-group
	assetLayerGroup_big = new L.LayerGroup();
	assetLayerGroup_middle = new L.LayerGroup();	
	assetLayerGroup_small = new L.LayerGroup();			
	
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
        url: 'includes/ofirData.json',
        async: false,
        success : function(data) {
			for (var i in data) {
				// Build cityData Obj
				cityData.push(data[i]);

				// build layers
				createCityLayers(cityData[i]);
			}
		}
    });
    
    /* Create an Layer-Group (use for fast remove all of them) */
	function createCityLayers(city) {
		var circle = L.circle([city.latitude, city.longitude], 700,  {
				    color: 'green',
				    fillColor: '#f03',
				    fillOpacity: 0.5
				    //className: cityData[i].fillkey
				});
				// City onClick Event
				circle.on('click', function(e){
					putRecData(e);
				});
				// City popup name onHover Event
				circle.bindPopup(city.name);
				circle.on('mouseover', function(e) {
					this.openPopup();
				});
				circle.on('mouseout', function(e) {
					this.closePopup();
				}); 
		
		// Create an Layer-Group (use for fast remove all of them)
		switch(city.type){
		case 0: 
			assetLayerGroup_big.addLayer(circle);
			break;
		case 1:
			assetLayerGroup_middle.addLayer(circle);
			break;
		case 2:
			assetLayerGroup_small.addLayer(circle);
			break;
		}
	}
}



function putRecData(e){
	/* normalization */
	var max =0;
	for (var k=0; k<data[i].sums.length; k++){
		//1 Find the height val
		max= Math.max(data[i].sums[k], data[i].sum2,cityData[i].sum3,cityData[i].sum4,max);
	}
	// static data for test
	rectangles(32.0852999, 34.78176759999999,	city_toShow.ru, 'ru', 0);
	rectangles(32.0852999, 34.78176759999999,	city_toShow.rd, 'rd', 0);
	rectangles(32.0852999, 34.78176759999999,	city_toShow.ld, 'ld', 0);
	rectangles(32.0852999, 34.78176759999999,	city_toShow.lu, 'lu', 0);
	
	rectangles(32.068424, 34.824785,	city_toShow.ru, 'ru', 0);
	rectangles(32.068424, 34.824785,	city_toShow.rd, 'rd', 0);
	rectangles(32.068424, 34.824785,	city_toShow.ld, 'ld', 0);
	rectangles(32.068424, 34.824785,	city_toShow.lu, 'lu', 0);
	
	for (i in cityData){
		if (cityData[i].latitude == e.target._latlng.lat && cityData[i].longitude == e.target._latlng.lng){
			console.log(cityData[i].name);
			
			// find places that theyer size - like user checked
			//if (cityData[i].type == places_ToShow){
				/*/// -- A ----
				// Put cities data in 4 rectangles
				// find the data about the year - like user checked
				for(k in cityData[i].sums){
					//debugger;
					if (cityData[i].sums[k].year == year_ToShow){
						
						var city_toShow = {
							latitude: 0,
							longitude: 0,
							type: 0,
							ru: 0,
							rd: 0,
							ld: 0,
							lu: 0
						};
						
						city_toShow.latitude = cityData[i].latitude;
						city_toShow.longitude = cityData[i].longitude;
						
						city_toShow.type = cityData[i].type;
						
						// find the 4 things to show - like user checked
						$.each(cityData[i].sums[k], function(key, val) {
							//show city rectangles data by lat-lng and value
								// cityData[i].latitude
								// cityData[i].longitude
								// val
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
						//city(city_toShow);
						//break;
					}
					//console.log(cityData[j].latitude+" "+cityData[j].longitude+" "+cityData[j].sum1+" "+cityData[j].sum2+" "+cityData[j].sum3+" "+cityData[j].sum4);
					//city(cityData[j].latitude, cityData[j].longitude, [cityData[j].sum1, cityData[j].sum2, cityData[j].sum3, cityData[j].sum4]);
				}*/	
			//}
		}
	}
	//console.log(e);
	
	function city(city_toShow){
		rectangles(city_toShow.latitude, city_toShow.longitude,	city_toShow.ru, 'ru', city_toShow.type);
		rectangles(city_toShow.latitude, city_toShow.longitude,	city_toShow.rd, 'rd', city_toShow.type);
		rectangles(city_toShow.latitude, city_toShow.longitude,	city_toShow.ld, 'ld', city_toShow.type);
		rectangles(city_toShow.latitude, city_toShow.longitude,	city_toShow.lu, 'lu', city_toShow.type);
	}
	function rectangles(lat,lon,dist,recNum, type){
		/*switch (city_toShow.type){
		case 0:	dist/=500000000;
			break;
		case 1: dist/=50000000;
			break;
		case 2: dist/=10000000;
			break;
		}*/
		
		switch (recNum){
		case 'ru':	//ru
			// A - define rectangle geographical bounds
			//var bounds = [[lat, lon], [lat+(dist), lon+(dist)]];
			var bounds = [[lat, lon], [lat+STEP_LAT, lon+STEP_LON]];
			// create an orange rectangle
			var rec = L.rectangle(bounds, {color: ORANGE, weight: 7, fillOpacity: 1}).addTo(map);
			rec.bindPopup("city name");
			rec.on('mouseover', function(e) {
				this.openPopup();
			});
			rec.on('mouseout', function(e) {
				this.closePopup();
			}); 
			break;
		case 'rd':	//rd
			// B - define rectangle geographical bounds
			var bounds = [[lat, lon], [lat-STEP_LAT, lon+STEP_LON]];
			// create an orange rectangle
			var rec = L.rectangle(bounds, {color: GRAY, weight: 7, fillOpacity: 1}).addTo(map);
			rec.bindPopup("city name");
			rec.on('mouseover', function(e) {
				this.openPopup();
			});
			rec.on('mouseout', function(e) {
				this.closePopup();
			});
			break;
		case 'ld':	//ld
			// C - define rectangle geographical bounds
			var bounds = [[lat, lon], [lat-STEP_LAT, lon-STEP_LON]];
			// create an orange rectangle
			var rec = L.rectangle(bounds, {color: GREEN, weight: 7, fillOpacity: 1}).addTo(map);
			rec.bindPopup("city name");
			rec.on('mouseover', function(e) {
				this.openPopup();
			});
			rec.on('mouseout', function(e) {
				this.closePopup();
			}); 
			break;
		case 'lu':	//lu
			// D - define rectangle geographical bounds
			var bounds = [[lat, lon], [lat+STEP_LAT, lon-STEP_LON]];
			// create an orange rectangle
			var rec = L.rectangle(bounds, {color: BLUE, weight: 7, fillOpacity: 1}).addTo(map);
			rec.bindPopup("city name");
			rec.on('mouseover', function(e) {
				this.openPopup();
			});
			rec.on('mouseout', function(e) {
				this.closePopup();
			}); 
			break;
		}
	}
}




function createDiagram(){
	// clear last diagram
	$('#diagram').empty();
	
	// draw new diagram
	var centerPos = diagramMax/2;
	var diagramContainer = d3.select('#diagram').append("svg").attr("width", diagramMax).attr("height", diagramMax);
	var diagramCounter = {
		ru : 0,
		rd : 0,
		ld : 0,
		lu : 0
	};
	
	/* count all values user checked */
	for (i=0; i<cityData.length; i++){
		if (cityData[i].type == places_ToShow){
			
			for (k=1; k<cityData[i].sums.length; k++){
				if (cityData[i].sums[k].year == year_ToShow){
					$.each(cityData[i].sums[k], function(key, val) {
						switch (key){
						case diagram.ru:
							diagramCounter.ru+= val;
							break;
						case diagram.rd:
							diagramCounter.rd+= val;
							break;
						case diagram.ld:
							diagramCounter.ld+= val;
							break;
						case diagram.lu:
							diagramCounter.lu+= val;
							break;
						}
					});
				}
			}
		}
	}
	
	/* normalization */
	var max= Math.max(diagramCounter.ru, diagramCounter.rd, diagramCounter.ld, diagramCounter.lu);
	$.each(diagramCounter, function(key, val) {
		switch (key){
		case 'ru':
			diagramCounter.ru= (val/max)*(diagramMax/2);
			break;
		case 'rd':
			diagramCounter.rd= (val/max)*(diagramMax/2);
			break;
		case 'ld':
			diagramCounter.ld= (val/max)*(diagramMax/2);
			break;
		case 'lu':
			diagramCounter.lu= (val/max)*(diagramMax/2);
			break;
		}
	});
	
	var rec_ru = diagramContainer.append("rect")	//1- ORANGE
			.attr("x", centerPos)
			.attr("y", centerPos-diagramCounter.ru)
			.attr("width", diagramCounter.ru)
			.attr("height", diagramCounter.ru)
			.style("fill", ORANGE);
		
	var rec_rd = diagramContainer.append("rect")	//2- GRAY
			.attr("x", centerPos)
			.attr("y", centerPos)
			.attr("width", diagramCounter.rd)
			.attr("height", diagramCounter.rd)
			.style("fill", GRAY);

	var rec_ld = diagramContainer.append("rect")	//3- GREEN
			.attr("x", centerPos-diagramCounter.ld)
			.attr("y", centerPos)
			.attr("width", diagramCounter.ld)
			.attr("height", diagramCounter.ld)
			.style("fill", GREEN);

	var rec_lu = diagramContainer.append("rect")	//4- BLUE
			.attr("x", centerPos-diagramCounter.lu)
			.attr("y", centerPos-diagramCounter.lu)
			.attr("width", diagramCounter.lu)
			.attr("height", diagramCounter.lu)
			.style("fill", BLUE);
}

function rangeSlider_Handler(){
	//var range = document.mapDataSettingsForm.year;
	$("#year").change(function() {
		year_ToShow = this.valueAsNumber;
		putCities();
		createDiagram();
	});
}

function radioButtons_Handler(){
	var rad = document.mapDataSettingsForm.mapData;
	var prev = null;
	
	for(var i = 0; i < rad.length; i++) {
	    rad[i].onclick = function() {
	        if(this !== prev) {
	            prev = this;
	            places_ToShow = this.value;
	            putCities();
	            createDiagram();
	        }
	    };
	}
}
function putCities(){
	// Remove all layers that optional added before
	map.removeLayer(assetLayerGroup_big);
	map.removeLayer(assetLayerGroup_middle);
	map.removeLayer(assetLayerGroup_small);
	
	// Set Layer like user checked
	switch (parseInt(places_ToShow)){
	case 0:
		assetLayerGroup_big.addTo(map);
		break;
	case 1:
		assetLayerGroup_middle.addTo(map);
		break;
	case 2:
		assetLayerGroup_small.addTo(map);
		break;
	}
}