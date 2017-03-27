/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	var addToFavourites = function(event)
	{
		return function()
		{
			// Get the old items and if there are any -> pass to an array
			var currentFavs = JSON.parse(localStorage.getItem('favourites')) || [];
			//Get the new event
			var newFav = event;
			//send it that array
			currentFavs.push(newFav);
			localStorage.setItem('favourites', JSON.stringify(currentFavs));
		}
	}


	//Get all the favourites and push into an array
    var getFavsArray = function()
    {
    	var currentFavs = JSON.parse(localStorage.getItem('favourites')) || [];
    	return currentFavs;
	}


	var displayFavourites = function()
	{
		if(localStorage.getItem('favourites') != null)
		{
			var favourites = $.parseJSON(localStorage.getItem('favourites'));
			var output = $.each(favourites, function(index, e) {
		    	var favBox = $("<div class='media'><div class='media-body'><h4 class='media-right'>Location: " + e.event_name +"</h4></div>");
		        var del = $("<div class='list-remove'><span class='glyphicon glyphicon-remove'></span></div>").click(removeFromFavourites(e.event_id));
		        $(".list-content-items").append(del,favBox);
	    	});
		}
	}

	var removeFromFavourites = function (event) 
	{
		return function()
		{
			if(localStorage.getItem('favourites') != null)
			{
				var favEvents = getFavsArray();
				var uniqueID = favEvents.indexOf(event.event_id);
				if(uniqueID === -1) 
				{
					favEvents.splice(uniqueID, 1);
				}
				localStorage.setItem("favourites", JSON.stringify(favEvents))
				location.reload();
			}

		}
	}

	var init = function ()
	{
		displayFavourites()
		$('.go-back').click(function(){
	        parent.history.back();
	        return false;
    	});
	}

$(document).ready(function() {
	init();
});

module.exports = {
	addToFavourites: addToFavourites,
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	
	var eventLocationMap = function(event)
	{
		return function(){
			if (typeof(localStorage) != 'undefined' ) {
			    localStorage.setItem('events', JSON.stringify(event));
			    showEventData();
			}
			else {
			    console.log('Oh dear.. we may not work on your device :(')
			}
		}
	}

	var showEventData = function()
	{
		if(localStorage.getItem('events') != null)
		{
			var event = $.parseJSON(localStorage.getItem('events'));
			var event_name = event.event_name;
			$(".event-title").append(event_name)
			initMap(event);
		}

	}
/**
	 * [initMap Draw Map - Get Current User Position with GeoLocation and 
	 * then Map the Destination from Local Storage]
	 * @param  {[type]} event [object from local storage]
	 * @return {[type]}       [draw map]
	 */
	var initMap = function(event)
	{	

		/*
			Set the event coordinates (lat, lng) to an object: event_coords
		 */
		var event_coords = {lat: event.lat, lng: event.lng};
		navigator.geolocation.getCurrentPosition(function (position) { 
        
		    var lat = position.coords.latitude;                    
		    var long = position.coords.longitude;                 
		    var coords = new google.maps.LatLng(lat, long);

		    var directionsService = new google.maps.DirectionsService();
		    var directionsDisplay = new google.maps.DirectionsRenderer();
		  
		    var map = new google.maps.Map($("#map")[0], {
	          zoom: 15,
	          center: coords
	        });
	  
  
	     	directionsDisplay.setMap(map);
		    var request = {
		       origin:coords, 
		       destination: event_coords,
		       travelMode: google.maps.TravelMode.DRIVING,
		     };

		    directionsService.route(request, function (response, status) {
		       if (status == google.maps.DirectionsStatus.OK) {
		        	directionsDisplay.setDirections(response);
		    	}
		    });         


		});
	}

	var init = function ()
	{
		showEventData()
		$('.go-back').click(function(){
	        parent.history.back();
	        return false;
    	});
	}



$(document).ready(function() {
	init();
});

module.exports = {
	eventLocationMap : eventLocationMap
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var map = __webpack_require__(1);
var favourites = __webpack_require__(0);


	/**
	 * [loadAuthorProfile description]
	 * @param  {[object]} author [author objects]
	 * @return {[object]}        [callback]
	 */
	var loadAuthorProfile = function(author)
	{
		return function(){
			if (typeof(localStorage) != 'undefined' ) {
			    localStorage.setItem('authors', JSON.stringify(author));
			    profile.showAuthorData();
			}
			else {
			    console.log('Oh dear.. we may not work on your device :(')
			}
		}
	}

	var showAuthorData = function()
	{
		if(localStorage.getItem('authors') != null)
		{
			//load profile page
			var author = $.parseJSON(localStorage.getItem('authors'));
			var author_name = author.name;
			var author_description = author.author_description;
			var img = author.img_url;
			$(".prof-name").append(author_name);
			$(".prof-desc").append(author_description);
			$(".prof-large-img").attr("src", img);
			listAuthorEvents(author);
		}
	}


	var listAuthorEvents = function(author)
	{
		var events = author.events;
		$.each(events, function(index, event) {
			var evBox = $("<div class='col-xs-12 col-sm-12 prof-item'><div class='col-xs-10 col-offset-1 col-sm-10 col-sm-offset-1 event-details'><li class='no-bullets'>"+" "+event.event_name+"</li><li class='no-bullets'>"+"Location:"+event.event_location+"</li></div></div>");
			var marker = $("<a class='location-marker' href='map.html'><div class='col-xs-2 col-sm-12 btn-rm'><span class='glyphicon glyphicon-map-marker prof-marker'></span></div></a>").click(map.eventLocationMap(event))
            var favs = $("<a href='favourites.html'><div class='col-xs-2 col-sm-12 btn-rm'><span class='glyphicon glyphicon-star add'></span></div></a>").click(favourites.addToFavourites(event));
			$(".prof-list").prepend(marker,  favs, evBox);
			
		});
		
	}


	

	var init = function ()
	{
		showAuthorData()
		$('.go-back').click(function(){
	        parent.history.back();
	        return false;
    	});
	}


$(document).ready(function(){
	init();	
});


module.exports={
	loadAuthorProfile: loadAuthorProfile,
	showAuthorData: showAuthorData
}
	

/***/ })
/******/ ]);