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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
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
		if(navigator.geolocation)
		{
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
		else
		{
			console.log('Looks like your device does not support Google Map Geolocation');
		}
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

/***/ })
/******/ ]);