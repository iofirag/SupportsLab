/*L.marker([31, 35]).addTo(map).bindPopup("<b>You Are here!</b>").openPopup();

			 /*L.circle([32.8167, 34.9833], 500, {
			 	color : 'red',
			 	fillColor : '#f03',
			 	fillOpacity : 0.5
			 }).addTo(map).bindPopup("I am a circle.");*/

			 //L.polygon([[51.509, -0.08], [51.503, -0.06], [51.51, -0.047]]).addTo(map).bindPopup("I am a polygon.");
			
/*function addLayers_b() {
				L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					maxZoom : 18
				}).addTo(map);
			}*/
			

// Marker with image
			/*var homeIcon = L.icon({
				iconUrl: 'includes/leaflet-0.7.3/images/home.png',
				iconSize: [32, 32],
				iconAnchor: [16, 16]
			});
			L.marker([32, 35], {
				icon: homeIcon
			}).addTo(map);*/
			
			// Event onClick
			/*var popup = L.popup(); 
			function onMapClick(e) {
				popup.setLatLng(e.latlng).setContent('<img src="includes/leaflet-0.7.3/images/home.png">').openOn(map);
			}
			map.on('click', onMapClick);*/
			

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
