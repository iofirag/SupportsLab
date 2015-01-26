/* DB */
cityData = [];

/* Map */
var map;
var assetLayerGroup;
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

	STEP_LAT = 0.04;
	STEP_LON = 0.05;

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
	L.mapbox.accessToken = 'pk.eyJ1IjoiZXJleiIsImEiOiJBcERuZV9rIn0.osZ0ZA6WBNN9-urjHfkccQ#8';
	map = L.mapbox.map('map', 'erez.l1l22p98').setView([31.5, 36], 8);
	
	// General - (hebrew+arabic)
	/*L.mapbox.accessToken = 'pk.eyJ1IjoiaW9maXJhZyIsImEiOiJ6bFRjUlJ3In0.wnfOTbaAq0r1bsia3puGRg';
	map = L.mapbox.map('map', 'examples.map-i86nkdio').setView([31.5, 36], 8); */
	
	/*map = new L.Map('map', {
	    center: new L.LatLng(31.5, 36),
	    zoom: 8,
	    layers: [
	        //L.tileLayer('http://{s}.www.toolserver.org/tiles/osm-no-labels/{z}/{x}/{y}.png')
	        L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg')
	    ]
	});*/
	
	/********** Control on Map-Zoom Events *************/
	map.on('zoomend', function(e) {
	    console.log("zoomend"+" "+map.getZoom());
	});
	
	// initiate data layer-group
	assetLayerGroup = new L.LayerGroup();			
	
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
				
				/* normalization */
				var max =0;
				for (var k=0; k<data[i].sums.length; k++){
					//1 Find the height val
					//max= Math.max(data[i].sums[k], data[i].sum2,cityData[i].sum3,cityData[i].sum4,max);	//max=4236710884
					
					// data[i].sum1/= (3000000000);
					// data[i].sum2/= (3000000000);
					// data[i].sum3/= (3000000000);
					// data[i].sum4/= (3000000000);
				}
				

				// Build cityData Obj
				cityData.push(data[i]);
				
				console.log("max="+max);
			}
		}
    });
}

function putRecData(e){
	// For test
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
}

function putCities(){
	assetLayerGroup.clearLayers();
	for (i in cityData){
		// find places that theyer size - like user checked
		if (cityData[i].type == places_ToShow){
			
			/// -- B ----
			//Put cities (bubbles)
			var circle = L.circle([cityData[i].latitude, cityData[i].longitude], 700,  {
			    color: 'green',
			    fillColor: '#f03',
			    fillOpacity: 0.5
			    //className: cityData[i].fillkey
			});
			circle.on('click', function(e){
				putRecData(e);
			});
			
			
			
			// Create an Layer-Group (use for fast remove all of them)
			assetLayerGroup.addLayer(circle);
		}
		assetLayerGroup.addTo(map);
	}
	
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