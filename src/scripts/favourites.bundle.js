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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
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

/***/ })
/******/ ]);