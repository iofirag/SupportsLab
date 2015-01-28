/* DB */
cityData = [];

/* Map */
var map;
var assetLayerGroup_big;
var assetLayerGroup_middle;
var assetLayerGroup_small;
var assetLayerGroup_recData;

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

	DIST_FOR_CITY_TITLE = .0; //0.3
	STEP_LAT = .04;
	STEP_LON = .05;
	
	

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
		
		// Clear clicked cities Handler
		clearButton_Handler();
		
	/* Show places */
	putCities();
	
	
	// for test
	$.ajax({
		url : "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.oref.org.il%2FWarningMessages%2Falerts.json%22%20and%20charset%3D'utf-16'",
		dataType : 'jsonp',
		success : function(json) {
			// do stuff with json (in this case an array)
			// alert("Success");
			console.log(json);
		},
		error : function(res, error) {
			console.log(res);
			console.log("Can't do because: " + error);
		}
	}); 
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
	assetLayerGroup_recData = new L.LayerGroup();	
	
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
	// find max money for this year & placesType
	var max =0;
	var maxValues = {
			ru: 0,
			rd: 0,
			ld: 0,
			lu: 0
	};
	var city_toShow = {
			name: "",
			latitude: 0,
			longitude: 0,
			ru: 0,
			rd: 0,
			ld: 0,
			lu: 0
	};
	var city_toShow_yearData;
	
	for (i in cityData){
		
		// find places that theyer size - like user checked
		if (cityData[i].type == places_ToShow){
			
			// Find max value from all cities with this type & year
			for(k in cityData[i].sums){
				if (cityData[i].sums[k].year == year_ToShow){
					
					$.each(cityData[i].sums[k], function(key, val) {
						//show city rectangles data by lat-lng and value
							// cityData[i].latitude
							// cityData[i].longitude
						switch (key){
						case diagram.ru: maxValues.ru = val;
							break;
						case diagram.rd: maxValues.rd = val;
							break;
						case diagram.ld: maxValues.ld = val;
							break;
						case diagram.lu: maxValues.lu = val;
							break;
						}
						max= Math.max(maxValues.ru, maxValues.rd, maxValues.ld, maxValues.lu, max);
					});
					

					// If find city clicked by user - get latlng
					if (cityData[i].latitude == e.target._latlng.lat && cityData[i].longitude == e.target._latlng.lng) {
						// save city data
						city_toShow.name = cityData[i].name;
						city_toShow.latitude = cityData[i].latitude;
						city_toShow.longitude = cityData[i].longitude;
						
						// save year data
						city_toShow_yearData = cityData[i].sums[k];
					}
				}
			}
		}
	}
	console.log(max);
	
	
	$.each(city_toShow_yearData, function(key, val) {
		//show city rectangles data by lat-lng and value
		// cityData[i].latitude
		// cityData[i].longitude
		switch (key) {
			case diagram.ru:
				city_toShow.ru = val;
				break;
			case diagram.rd:
				city_toShow.rd = val;
				break;
			case diagram.ld:
				city_toShow.ld = val;
				break;
			case diagram.lu:
				city_toShow.lu = val;
				break;
		}
	}); 

	
	moneyRu = city_toShow.ru;
	moneyRd = city_toShow.rd;
	moneyLd = city_toShow.ld;
	moneyLu = city_toShow.lu;
	
	
	
	// normalize data
	debugger;
	city_toShow.ru= (city_toShow.ru/max)*(.5);
	city_toShow.rd= (city_toShow.rd/max)*(.5);
	city_toShow.ld= (city_toShow.ld/max)*(.5);
	city_toShow.lu= (city_toShow.lu/max)*(.5);
	debugger;
	city(city_toShow);
	
	function city(city_toShow){
		rectangles(city_toShow.latitude+DIST_FOR_CITY_TITLE, city_toShow.longitude, city_toShow.ru, 'ru', moneyRu, city_toShow.name, diagram.ru);
		rectangles(city_toShow.latitude+DIST_FOR_CITY_TITLE, city_toShow.longitude, city_toShow.rd, 'rd', moneyRd, city_toShow.name, diagram.rd);
		rectangles(city_toShow.latitude+DIST_FOR_CITY_TITLE, city_toShow.longitude, city_toShow.ld, 'ld', moneyLd, city_toShow.name, diagram.ld);
		rectangles(city_toShow.latitude+DIST_FOR_CITY_TITLE, city_toShow.longitude, city_toShow.lu, 'lu', moneyLu, city_toShow.name, diagram.lu);
	}
	function rectangles(lat,lon,dist,recNum,money,name,desctiption){
		var bounds;
		var color_var;
		switch (recNum){
		case 'ru':	//ru
			// A - define rectangle geographical bounds
			bounds = [[lat, lon], [lat+(dist), lon+(dist)]];
			//bounds = [[lat, lon], [lat+0.04, lon+0.05]];
			color_var= ORANGE;
			break;
		case 'rd':	//rd
			// B - define rectangle geographical bounds
			bounds = [[lat, lon], [lat-(dist), lon+(dist)]];
			color_var= GRAY;
			break;
		case 'ld':	//ld
			// C - define rectangle geographical bounds
			bounds = [[lat, lon], [lat-(dist), lon-(dist)]];
			color_var= GREEN;
			break;
		case 'lu':	//lu
			// D - define rectangle geographical bounds
			bounds = [[lat, lon], [lat+(dist), lon-(dist)]];
			color_var= BLUE;
			break;
		}
		
		map.removeLayer(assetLayerGroup_recData);
		
		// create a rectangle
		var rec = L.rectangle(bounds, {color: color_var, weight: 7, fillOpacity: 1});
		rec.bindPopup('<section>'+name+':'+desctiption+'</section><br><section>&#8362;<b>'+money+'</b></section>');
		rec.on('mouseover', function(e) {
			this.openPopup();
		});
		rec.on('mouseout', function(e) {
			this.closePopup();
		});
		assetLayerGroup_recData.addLayer(rec).addTo(map);
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
	var maxMoney_forDiagram= Math.max(diagramCounter.ru, diagramCounter.rd, diagramCounter.ld, diagramCounter.lu);
	$.each(diagramCounter, function(key, val) {
		switch (key){
		case 'ru':
			diagramCounter.ru= (val/maxMoney_forDiagram)*(diagramMax/2);
			break;
		case 'rd':
			diagramCounter.rd= (val/maxMoney_forDiagram)*(diagramMax/2);
			break;
		case 'ld':
			diagramCounter.ld= (val/maxMoney_forDiagram)*(diagramMax/2);
			break;
		case 'lu':
			diagramCounter.lu= (val/maxMoney_forDiagram)*(diagramMax/2);
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
function clearButton_Handler(){
	map.removeLayer(assetLayerGroup_recData);
	assetLayerGroup_recData.clearLayers();
}
function putCities(){
	// Remove all layers that optional added before
	map.removeLayer(assetLayerGroup_big);
	map.removeLayer(assetLayerGroup_middle);
	map.removeLayer(assetLayerGroup_small);
	
	map.removeLayer(assetLayerGroup_recData);
	assetLayerGroup_recData.clearLayers();
	
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