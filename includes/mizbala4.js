//$("#map").css("width", "80%");
	//map = L.map('map').setView([32, 36], 8);


//zoom = 0;
//
/* Mouse-Wheel Handler */
	// Safari
	// parent.addEventListener('mousewheel', mouseWheel, false);
	// // Firefox
	// parent.addEventListener('DOMMouseScroll', mouseWheel, false);
	
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


/* Add layeres to map */
	// function addLayers() {
		// map.featureLayer.on('ready', function() {
			// //var hull = turf.convex(map.featureLayer.getGeoJSON());
			// //L.mapbox.featureLayer(hull).addTo(map);
		// }).addTo(map);
	// }




// map = new L.Map('map', {
	    // center: new L.LatLng(31.5, 36),
	    // zoom: 8,
	    // layers: [
	        // L.tileLayer('http://{s}.www.toolserver.org/tiles/osm-no-labels/{z}/{x}/{y}.png'),
	        // L.tileLayer('http://{s}.www.toolserver.org/tiles/osm-labels-ar/{z}/{x}/{y}.png')
	    // ]
	// });
	


	//map.addEventListener("zoomend", vv,this);
	//function vv(){
	//	console.log("dd");
	//};
	



/******************** Add Map ****************************************************************/
	// Us
	L.mapbox.accessToken = 'pk.eyJ1IjoiZXJleiIsImEiOiJBcERuZV9rIn0.osZ0ZA6WBNN9-urjHfkccQ#8';
	map = L.mapbox.map('map', 'erez.l1l22p98').setView([31.5, 36], 8);
	
	// General - (hebrew+arabic)
	/*L.mapbox.accessToken = 'pk.eyJ1IjoiaW9maXJhZyIsImEiOiJ6bFRjUlJ3In0.wnfOTbaAq0r1bsia3puGRg';
	map = L.mapbox.map('map', 'examples.map-i86nkdio').setView([31.5, 36], 8); */
	
	// Real
	map = new L.Map('map', {
	    center: new L.LatLng(31.5, 36),
	    zoom: 8,
	    layers: [
	        L.tileLayer('http://{s}.www.toolserver.org/tiles/osm-no-labels/{z}/{x}/{y}.png')
	    ]
	});
	
	// Paint
	map = new L.Map('map', {
	    center: new L.LatLng(31.5, 36),
	    zoom: 8,
	    layers: [
	        L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg')
	    ]
	});
	/*********************************************************************************************/



/********** Control on Map-Zoom Events *************/
	map.on('zoomend', function(e) {
	    console.log("zoomend"+" "+map.getZoom());
	});




var prevW = -1, prevH = -1;

$(window).resize(function() {
    var widthChanged = false, heightChanged = false;
    if($(window).width() != prevW) {
        widthChanged  = true;
        //$("#map").css("height", prevW + 'px');
    }
    if($(window).height() != prevH) {
        heightChanged = true;
        //$("#map").css("height", $(document).height() + 'px');
    }

    // your stuff ...
    
    prevW = $(window).width();
    prevH = $(window).height();
});
	
$(document).ready(function() {
	//initiate var
	prevW = $(window).width();
	prevH = $(window).height();
}




				switch (data[i].type){
				case 0:	// Big
					// divide all the city data by X
					
					break;
				case 1:	// Normal
					// divide all the city data by Y
					break;
				case 2:	// Small
					// divide all the city data by Z
					break;
				}
				
				
				
			circle.on('mouseover', function(e) {
				this.openPopup();
			});
			circle.on('mouseout', function(e) {
				this.closePopup();
			}); 
			


			customCircleMarker = L.CircleMarker.extend({
			   options: { 
			      someCustomProperty: 'Custom data!',
			      anotherCustomProperty: 'More data!'
			   }
			});
			
			var myMarker = new customCircleMarker([31.505, 34.09], { 
			    title: 'Marker',
			    radius: 20,
			    someCustomProperty: 'Adding custom data to this marker!',
			    anotherCustomProperty: 'More custom data to this marker!'
			});
			myMarker.addTo(map);
			

assetLayerGroup.clearLayers();



/*switch (city_toShow.type){
		case 0:	dist/=500000000;
			break;
		case 1: dist/=50000000;
			break;
		case 2: dist/=10000000;
			break;
		}*/