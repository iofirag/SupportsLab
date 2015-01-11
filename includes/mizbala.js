// <script>
			// $("#zoom_map").css("height", $(document).height()+'px');
			// BLUE = "#264478";
			// RED = "#FF6E51";
			// YELLOW = "#FDC067";
			// GREEN = "#2DB69C";
// 			
			// ISRAEL = "#f5f0bb";
			// OTHER = "#e7e5d4";
// 			
			// townsData = [
				// {id: 'rishon-le-zion', name: 'ראשון לציון', latitude: 31.9500, longitude: 34.8000, radius: 3, 'fillKey': 'gt50',  "sum1":24,"color2":"blue", "sum2":10,"color1":"green",  "sum3":15,"color4":"purple", "sum4":18,"color3":"red"},
				// {id: 'haifa', name: 'חיפה', latitude: 32.8167, longitude: 34.9833, radius: 3, 'fillKey': 'gt50', "sum1":5,"color2":"blue", "sum2":15,"color1":"green", "sum3":6,"color4":"purple", "sum4":14,"color3":"red"},
				// {id: 'jerusalem', name: 'ירושלים', latitude: 31.7833, longitude: 35.2167, radius: 3, 'fillKey': 'gt50', "sum1":16,"color2":"blue", "sum2":10,"color1":"green", "sum3":9,"color4":"purple", "sum4":14,"color3":"red"},
				// {id: 'beer-sheva', name: 'באר-שבע', latitude: 31.2589, longitude: 34.7997, radius: 3, 'fillKey': 'gt50', "sum1":12,"color2":"blue", "sum2":11,"color1":"green", "sum3":10,"color4":"purple", "sum4":17,"color3":"red"}
			// ];
// 					
			// var zoom = new Datamap({
				// element: document.getElementById("zoom_map"),
				// scope: 'world',
				// // Zoom-in on Israel
				// setProjection: function(element) {
					// var projection = d3.geo.equirectangular()
									// .center([31, 35])
									// .rotate([0, 0])
									// .scale(9400*1.0)	//9400 standard
									// .translate([-120,-270]);
									// //.translate([element.offsetWidth / 2, element.offsetHeight / 2]);
					// var path = d3.geo.path().projection(projection);
// 					
					// return {path: path, projection: projection};
				// },
				// fills: {
					// "israel": "#f5f0bb",
					// //"others": "#e7e5d4",
					// defaultFill: "#e7e5d4"
				// },
				// data: {
					// 'ISR': { fillKey: "israel" }
				// }
			// });
			// zoom.bubbles(townsData, {
					// popupTemplate: function(geo, data) {
						// return "<div class='hoverinfo'>"+ data.name + "</div>";
				// }
			// });
	// </script>
// 	
	// <script>
		// //---- Put circles ----------------------------------
			// /*var svgContainer = d3.select("svg g");
// 
			// var jsonCircles = {
				// "cx" : 31,
				// "cy" : 35,
				// "r" : 100,
				// "color" : "black"
			// };
// 			
			// for (var i=0; i < jsonCircles.length; i++) {
			  // var circle = svgContainer.append("circle")
			  // .attr("cx", jsonCircles[i].cx)
			  // .attr("cy", jsonCircles[i].cy)
			  // .attr("r", jsonCircles[i].r)
			  // .style("width",10)
			  // .style("height",10);
			// }*/
			// //---------------------------------------------
	// </script>
// 	
	// <script>
			// /* Put money values (rectangles) on map */
			// /*var sqr = [
				// {"sum":10,"color":"green"},
				// {"sum":14,"color":"blue"},
				// {"sum":18,"color":"red"},
				// {"sum":15,"color":"purple"}
			// ];*/
// 			
			// for (i=0; i<townsData.length; i++){
				// // var rx= townsData[i].latitude;
				// // var ry= townsData[i].longitude-30;
// 
				// var svgContainer = d3.select("svg");
// 
				// /*****************************************/
				// //Find all town tags
				// var townList = $(".bubbles")[0];
				// var town = townList.children[i];
// 				
				// //Way-A - put id attribute for every tag (from json)
				// town.id = townsData[i].id;
// 				
				// //Way-B - take id data from 'dataset.info' in the tag
				// var townJson_String = town.dataset.info;
				// var townJson = jQuery.parseJSON( townJson_String );
				// var town_infoData_id = townJson.id;
// 				
				// //Way-C - take the cx, cy (after they generated)
				// var cx = town.cx.baseVal.value;
				// var cy = town.cy.baseVal.value-20;
				// /*****************************************/
// 
// 				
				// var circleAttributes = svgContainer.append("rect")	//1- blue
					// .attr("x", cx)
					// .attr("y", cy - townsData[i].sum1)
					// .attr("width", townsData[i].sum1)
					// .attr("height", townsData[i].sum1)
					// .style("fill", BLUE);
// 				
				// var circleAttributes = svgContainer.append("rect")	//2- RED
					// .attr("x", cx)
					// .attr("y", cy)
					// .attr("width", townsData[i].sum2)
					// .attr("height", townsData[i].sum2)
					// .style("fill", RED);
// 		
				// var circleAttributes = svgContainer.append("rect")	//3- YELLOW
					// .attr("x", cx - townsData[i].sum3)
					// .attr("y", cy)
					// .attr("width", townsData[i].sum3)
					// .attr("height", townsData[i].sum3)
					// .style("fill", YELLOW);	//townsData[i].color3
// 		
				// var circleAttributes = svgContainer.append("rect")	//4- GREEN
					// .attr("x", cx - townsData[i].sum4)
					// .attr("y", cy - townsData[i].sum4)
					// .attr("width", townsData[i].sum4)
					// .attr("height", townsData[i].sum4)
					// .style("fill", GREEN);
			// }
		// </script>
		



				// townsData[i].sum1/= (10*counter);
				// townsData[i].sum2/= (10*counter);
				// townsData[i].sum3/= (10*counter);
				// townsData[i].sum4/= (10*counter);
				
				//while (townsData[i].sum1>20) townsData[i].sum1/=10;
				//while (townsData[i].sum2>20) townsData[i].sum2/=10;
				//while (townsData[i].sum3>20) townsData[i].sum3/=10;
				//while (townsData[i].sum4>20) townsData[i].sum4/=10;
				
				//townsData[i].sum1 /= 10000000;
				//townsData[i].sum2 /= 10000000;
				//townsData[i].sum3 /= 10000000;
				//townsData[i].sum4 /= 10000000;
				

	
	/* normalization */
	//diagramCounter.a /= 1000000;
	//diagramCounter.b /= 1000000;
	//diagramCounter.c /= 1000000;
	//diagramCounter.d /= 1000000;
	


// for (i=0; i<townsData.length; i++){
		// $.each(townsData[i], function(key, val) {
			// if (key == diagram.a) diagramCounter.a+= val; /* if (diagramCounter.a>=500) diagramCounter.a*=0.1;} */
			// else if (key == diagram.b) diagramCounter.b+= val; /* if (diagramCounter.b>=500) diagramCounter.b*=0.1;}*/
			// else if (key == diagram.c) diagramCounter.c+= val; /* if (diagramCounter.c>=500) diagramCounter.c*=0.1;}*/
			// else if (key == diagram.d) diagramCounter.d+= val; /* if (diagramCounter.d>=500) diagramCounter.d*=0.1;}*/
		// });
	// }
	
// var svgContainer = d3.select('#diagram').append("svg").append("g");//.attr("width", 700).attr("height", 700);


/*****************************************/
		// //Find all town tags
		// var townList = $(".bubbles")[0];
		// var town = townList.children[i];
// 		
		// //Way-A - put id attribute for every tag (from json)
		// //town.id = townsData[i].id;
// 		
		// // //Way-B - take id data from 'dataset.info' in the tag
		// // var townJson_String = town.dataset.info;
		// // var townJson = jQuery.parseJSON( townJson_String );
		// // var town_infoData_id = townJson.id;
		// // 				
		// //Way-C - take the cx, cy (after they generated)
		// var cx = town.cx.baseVal.value;
		// var cy = town.cy.baseVal.value-20;
		// /*****************************************/
		


// var zoom = new Datamap({
		// element: document.getElementById("zoom_map"),
		// scope: 'world',
		// // Zoom-in on Israel
		// setProjection: function(element) {
			// var projection = d3.geo.equirectangular()
							// .center(center)
							// .rotate([0, 0])
							// .scale(scale);
							// //.translate(translate);
							// //.translate([element.offsetWidth / 2, element.offsetHeight / 2]);
			// var path = d3.geo.path().projection(projection);
// 			
			// return {path: path, projection: projection};
		// },
		// fills: {
			// "israel": "#f5f0bb",
			// //"others": "#e7e5d4",
			// defaultFill: "#e7e5d4"
		// },
		// data: {
			// 'ISR': { fillKey: "israel" }
		// }
	// });
	// zoom.bubbles(townsData, {
			// popupTemplate: function(geo, data) {
				// return "<div class='hoverinfo'>"+ data.name + "</div>";
		// }
	// });
	


// var box = {
	// x : -180,
	// y : -90,
	// width : 360,
	// height : 180
// };

// var render = function() {
	// for (var i = 0; i < layers.length; i++) {
		// layers[i].box = box;
		// layers[i].render();
	// }
// };
// var panBy = function(x, y) {
	// var degreesPerPixel = box.width / 1024.0;
	// box.x -= x * degreesPerPixel;
	// box.y += y * degreesPerPixel;
	// render();
// };
// var zoomBy = function(s, x, y) {
	// var degreesPerPixel = box.width / 1024.0;
	// var boxX = box.x + (x * degreesPerPixel);
	// var boxY = box.y + ((512 - y) * degreesPerPixel);
	// box.x -= boxX;
	// box.y -= boxY;
	// box.x *= s;
	// box.y *= s;
	// box.width *= s;
	// box.height *= s;
	// box.x += boxX;
	// box.y += boxY;
	// render();
// };

/* Mouse Down */
// var mouseDown = function(e) {
	// //console.log("Down");
	// var prevMouse = {
		// x : e.clientX,
		// y : e.clientY
	// };
	// /* Mouse Move */
	// var mouseMove = function(e) {
		// //console.log("Move");
		// // Calculate distanse between the old coordinate and the new coordinate
		// x = e.clientX-prevMouse.x;
		// y = e.clientY-prevMouse.y;
// 		
		// // Save previews data
		// prevMouse.x = e.clientX;
		// prevMouse.y = e.clientY;
		// e.preventDefault();
// 		
		// // Change the translate values
		// // var addX=0; 
		// // if (x>0) addX=-0.01; 
		// // else if (x<0) addX=0.01;
		// // var addY=0; 
		// // if (y>0) addY=0.01;
		// // else if (y<0) addY=-0.01;
// 		
		// center[0]+= -x/150;//x;
		// center[1]+= y/150;//(-y);
// 		
		// // Change the old map with new one
		// $("#zoom_map").empty();
		// createMap();
	// };
	// /* Mouse Up */
	// var mouseUp = function(e) {
		// //console.log("Up");
		// document.body.style.cursor = null;
		// document.removeEventListener('mousemove', mouseMove, false);
		// document.removeEventListener('mouseup', mouseUp, false);
	// };
	// document.body.style.cursor = 'hand';
	// document.addEventListener('mousemove', mouseMove, false);
	// document.addEventListener('mouseup', mouseUp, false);
// };
// 
// /* Mouse Wheel */
// var mouseWheel = function(e) {
// 	
	// var localX = e.clientX;
	// var localY = e.clientY;
// 
	// // correct for scrolled document
	// //localX += document.body.scrollLeft + document.documentElement.scrollLeft;
	// //localY += document.body.scrollTop + document.documentElement.scrollTop;
// 
	// // correct for nested offsets in DOM
	// // for (var node = parent; node; node = node.offsetParent) {
		// // localX -= node.offsetLeft;
		// // localY -= node.offsetTop;
	// // }
// 
	// var delta = 0;
	// if (e.wheelDelta) {
		// delta = e.wheelDelta;
	// } else if (e.detail) {
		// delta = -e.detail;
	// }
// 
	// if (delta > 0) {
		// //zoomBy(0.9, localX, localY);
		// scale*=ZOOM_BY;
		// zoomTimes++;
		// /****Way A **********
		// translate[0]-= 70;
		// translate[1]-= 70;
// 		
		// /****Way B **********
		// translate[0]*= 1.5;
		// translate[1]*=1.1;
		// /*******************/
// 		
	// } else if (delta < 0) {
		// //zoomBy(1.1, localX, localY);
		// scale/=ZOOM_BY;
		// //if (zoomTimes>1) 
		// zoomTimes--;		
		// //else zoomTimes=1;
// 		
		// /**Way A **********
		// translate[0]+= 70;
		// translate[1]+= 70;
		// /**Way B **********
		// translate[0]/= 1.5;
		// translate[1]/=1.1;
		// /*******************/
	// }
	// //console.log(scale);
// 
	// // cancel page scroll
	// e.preventDefault();
// 	
	// // Change the old map with new one
	// $("#zoom_map").empty();
	// createMap();
// };