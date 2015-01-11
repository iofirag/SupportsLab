/* Data-base */
townsData = [];

/* Default parameters */ 
center = [35, 31.7];
scale = 9400;
translate = [0,0];
ZOOM_BY = 1.5;
zoomTimes = 1;

diagram = {
		a : 'sum1',
		b : 'sum2',
		c : 'sum3',
		d : 'sum4'
};

$(document).ready(function() {
	/* load database */
	readFromDatabase();

	/* Create the first map with default parameters */
	createMap();
	createDiagram();
	
	/* Add Event Listeners */
	parent.addEventListener('mousedown', mouseDown, false);
	// Safari
	parent.addEventListener('mousewheel', mouseWheel, false);
	// Firefox
	parent.addEventListener('DOMMouseScroll', mouseWheel, false);
}); 

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
var mouseDown = function(e) {
	//console.log("Down");
	var prevMouse = {
		x : e.clientX,
		y : e.clientY
	};
	/* Mouse Move */
	var mouseMove = function(e) {
		//console.log("Move");
		// Calculate distanse between the old coordinate and the new coordinate
		x = e.clientX-prevMouse.x;
		y = e.clientY-prevMouse.y;
		
		// Save previews data
		prevMouse.x = e.clientX;
		prevMouse.y = e.clientY;
		e.preventDefault();
		
		// Change the translate values
		// var addX=0; 
		// if (x>0) addX=-0.01; 
		// else if (x<0) addX=0.01;
		// var addY=0; 
		// if (y>0) addY=0.01;
		// else if (y<0) addY=-0.01;
		
		center[0]+= -x/150;//x;
		center[1]+= y/150;//(-y);
		
		// Change the old map with new one
		$("#zoom_map").empty();
		createMap();
	};
	/* Mouse Up */
	var mouseUp = function(e) {
		//console.log("Up");
		document.body.style.cursor = null;
		document.removeEventListener('mousemove', mouseMove, false);
		document.removeEventListener('mouseup', mouseUp, false);
	};
	document.body.style.cursor = 'hand';
	document.addEventListener('mousemove', mouseMove, false);
	document.addEventListener('mouseup', mouseUp, false);
};

/* Mouse Wheel */
var mouseWheel = function(e) {
	
	var localX = e.clientX;
	var localY = e.clientY;

	// correct for scrolled document
	//localX += document.body.scrollLeft + document.documentElement.scrollLeft;
	//localY += document.body.scrollTop + document.documentElement.scrollTop;

	// correct for nested offsets in DOM
	// for (var node = parent; node; node = node.offsetParent) {
		// localX -= node.offsetLeft;
		// localY -= node.offsetTop;
	// }

	var delta = 0;
	if (e.wheelDelta) {
		delta = e.wheelDelta;
	} else if (e.detail) {
		delta = -e.detail;
	}

	if (delta > 0) {
		//zoomBy(0.9, localX, localY);
		scale*=ZOOM_BY;
		zoomTimes++;
		/****Way A **********
		translate[0]-= 70;
		translate[1]-= 70;
		
		/****Way B **********
		translate[0]*= 1.5;
		translate[1]*=1.1;
		/*******************/
		
	} else if (delta < 0) {
		//zoomBy(1.1, localX, localY);
		scale/=ZOOM_BY;
		//if (zoomTimes>1) 
		zoomTimes--;		
		//else zoomTimes=1;
		
		/**Way A **********
		translate[0]+= 70;
		translate[1]+= 70;
		/**Way B **********
		translate[0]/= 1.5;
		translate[1]/=1.1;
		/*******************/
	}
	//console.log(scale);

	// cancel page scroll
	e.preventDefault();
	
	// Change the old map with new one
	$("#zoom_map").empty();
	createMap();
};


function createMap(){
	//console.log("start createMap()");
	$("#zoom_map").css("height", $(document).height()+'px');
	ORANGE = "#fcaa1c";
	GRAY = "#434d53";
	GREEN = "#7bb37f";
	BLUE = "#23959c";
			
	var zoom = new Datamap({
		element: document.getElementById("zoom_map"),
		scope: 'world',
		// Zoom-in on Israel
		setProjection: function(element) {
			var projection = d3.geo.equirectangular()
							.center(center)
							.rotate([0, 0])
							.scale(scale);
							//.translate(translate);
							//.translate([element.offsetWidth / 2, element.offsetHeight / 2]);
			var path = d3.geo.path().projection(projection);
			
			return {path: path, projection: projection};
		},
		fills: {
			"israel": "#f5f0bb",
			//"others": "#e7e5d4",
			defaultFill: "#e7e5d4"
		},
		data: {
			'ISR': { fillKey: "israel" }
		}
	});
	zoom.bubbles(townsData, {
			popupTemplate: function(geo, data) {
				return "<div class='hoverinfo'>"+ data.name + "</div>";
		}
	});
			
				
	/************************************/
		
	var svgContainer = d3.select("svg");
	var allCities = svgContainer.append("g").attr("class", "cities");
	var cityContainer = allCities.append("g").attr("class", "cityData");
		
	for (i=0; i<townsData.length; i++){

		/*****************************************/
		//Find all town tags
		var townList = $(".bubbles")[0];
		var town = townList.children[i];
		
		//Way-A - put id attribute for every tag (from json)
		//town.id = townsData[i].id;
		
		// //Way-B - take id data from 'dataset.info' in the tag
		// var townJson_String = town.dataset.info;
		// var townJson = jQuery.parseJSON( townJson_String );
		// var town_infoData_id = townJson.id;
		// 				
		//Way-C - take the cx, cy (after they generated)
		var cx = town.cx.baseVal.value;
		var cy = town.cy.baseVal.value-20;
		/*****************************************/
		
		
		var circleAttributes = cityContainer.append("rect")	//1- ORANGE
			.attr("x", cx)
			.attr("y", cy - townsData[i].sum1)
			.attr("width", townsData[i].sum1)
			.attr("height", townsData[i].sum1)
			.style("fill", ORANGE);
		
		var circleAttributes = cityContainer.append("rect")	//2- GRAY
			.attr("x", cx)
			.attr("y", cy)
			.attr("width", townsData[i].sum2)
			.attr("height", townsData[i].sum2)
			.style("fill", GRAY);

		var circleAttributes = cityContainer.append("rect")	//3- GREEN
			.attr("x", cx - townsData[i].sum3)
			.attr("y", cy)
			.attr("width", townsData[i].sum3)
			.attr("height", townsData[i].sum3)
			.style("fill", GREEN);	//townsData[i].color3

		var circleAttributes = cityContainer.append("rect")	//4- BLUE
			.attr("x", cx - townsData[i].sum4)
			.attr("y", cy - townsData[i].sum4)
			.attr("width", townsData[i].sum4)
			.attr("height", townsData[i].sum4)
			.style("fill", BLUE);
	}
	//console.log("finish createMap()");
}

function createDiagram(){
	var centerPos = 100;
	var svgContainer = d3.select('#diagram').append("svg").append("g");//.attr("width", 700).attr("height", 700);
	var diagramCounter = {
		a : 0,
		b : 0,
		c : 0,
		d : 0
	};
	
	for (i=0; i<townsData.length; i++){
		$.each(townsData[i], function(key, val) {
			if (key == diagram.a) diagramCounter.a+= val; /* if (diagramCounter.a>=500) diagramCounter.a*=0.1;} */
			else if (key == diagram.b) diagramCounter.b+= val; /* if (diagramCounter.b>=500) diagramCounter.b*=0.1;}*/
			else if (key == diagram.c) diagramCounter.c+= val; /* if (diagramCounter.c>=500) diagramCounter.c*=0.1;}*/
			else if (key == diagram.d) diagramCounter.d+= val; /* if (diagramCounter.d>=500) diagramCounter.d*=0.1;}*/
		    //console.log(key);
		});
	}
	
	/* normalization */
	//diagramCounter.a /= 1000000;
	//diagramCounter.b /= 1000000;
	//diagramCounter.c /= 1000000;
	//diagramCounter.d /= 1000000;
	
	var circleAttributes = svgContainer.append("rect")	//1- ORANGE
			.attr("x", centerPos)
			.attr("y", centerPos-diagramCounter.a)
			.attr("width", diagramCounter.a)
			.attr("height", diagramCounter.a)
			.style("fill", ORANGE);
		
		var circleAttributes = svgContainer.append("rect")	//2- GRAY
			.attr("x", centerPos)
			.attr("y", centerPos)
			.attr("width", diagramCounter.b)
			.attr("height", diagramCounter.b)
			.style("fill", GRAY);

		var circleAttributes = svgContainer.append("rect")	//3- GREEN
			.attr("x", centerPos-diagramCounter.c)
			.attr("y", centerPos)
			.attr("width", diagramCounter.c)
			.attr("height", diagramCounter.c)
			.style("fill", GREEN);	//townsData[i].color3

		var circleAttributes = svgContainer.append("rect")	//4- BLUE
			.attr("x", centerPos-diagramCounter.d)
			.attr("y", centerPos-diagramCounter.d)
			.attr("width", diagramCounter.d)
			.attr("height", diagramCounter.d)
			.style("fill", BLUE);
}

function readFromDatabase() {
	$.ajax({
        type: "GET",
        // url: 'includes/townsData.json',
        url: 'includes/townsData.json',
        async: false,
        success : function(data) {
			for (i in data) {
				// debugger;
				townsData.push(data[i]);
			}
			
			/* normalization */
			for (i=0; i<townsData.length; i++){
				//1 Find the hight val
				var max = Math.max(townsData[i].sum1,townsData[i].sum2,townsData[i].sum3,townsData[i].sum4);
				var counter=0;
				
				//2 Divide it with 10 untill it less then 20 (save how many times divided)
				while (max>20){ 
					max/=10;
					counter++;
				}
				
				//3 Divide all other with same number
				
				for (j=0; j<counter; j++){
					townsData[i].sum1/= (10);
					townsData[i].sum2/= (10);
					townsData[i].sum3/= (10);
					townsData[i].sum4/= (10);
				}
				
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
			}
		}
    });
}