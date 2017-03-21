/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var authorModel = __webpack_require__(1);

	$(document).ready(function(){

		//Searchbox 
		var $searchBox = $("#search");
		var $output = $(".output");
		var gAuthors;

		
		/**
		 * [trim search value - ensure user cannot search through an empty value]
		 * @param  {[type]} str [description]
		 * @return {[type]}     [description]
		 */
		var trim = function(str) {
			if(str==="")
			{
				//do not validate as its empty
				return false;
			}
			return true;
		}


		/**
		 * [searchFunction initiate the search when something is entered - on keydown]
		 * @return {[type]} [description]
		 */
		var searchFunction = function(){
			//when something is entered into the searchbox then do:
			$searchBox.keydown(function(e){
				compSearch();
			});
		}
		
		/**
		 * [compSearch description]
		 * @return {[array]} [of authors]
		 */
		var compSearch = function(){
			var $search_term = $searchBox.val().toLowerCase();
			if(trim($search_term))
			{
				var searchedAuthors = authorModel.searchAuthors($search_term.toLowerCase());
				outputAuthors(searchedAuthors);
			}
		}

		/**
		 * [outputAuthors description]
		 * @param  {[type]} searchResults [array]
		 * @return {[object]}               [author object]
		 */
		var outputAuthors = function(searchResults)
		{
			$.each(searchResults, function(index, res) {
				var $res_line = $("<a href='profiles.html'><li class='author_search_det'>"+res.name+"</li></a>").click(loadAuthorProfile(res))
				$output.prepend($res_line);
			});
		}

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
				    showAuthorData();
				}
				else {
				    console.log('Oh dear.. we may not work on your device :(')
				}
			}
		}



		var listAuthorEvents = function(author)
		{
			var events = author.events;
			$.each(events, function(index, event) {
				var evBox = $("<div class='col-xs-12 col-sm-12 prof-item'><div class='col-xs-10 col-offset-1 col-sm-10 col-sm-offset-1 event-details'><li class='no-bullets'>"+" "+event.event_name+"</li><li class='no-bullets'>"+"Location:"+event.event_location+"</li></div></div>");
				var marker = $("<a class='location-marker' href='map.html'><div class='col-xs-2 col-sm-12 btn-rm'><span class='glyphicon glyphicon-map-marker prof-marker'></span></div></a>").click(eventLocationMap(event))
	            var favs = $("<a href='favourites.html'><div class='col-xs-2 col-sm-12 btn-rm'><span class='glyphicon glyphicon-star add'></span></div></a>").click(addToFavourites(event));
				$(".prof-list").prepend(marker,  favs, evBox);
				
			});
			
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
				var filteredFavs = favourites.filter(function(itm, i, e) 
				{
		    		return i === favourites.indexOf(itm)
		    	});
				loopFavourites(filteredFavs);
			}
		}

		var loopFavourites = function(loop)
		{
			var output = $.each(loop, function(index, e) {
		    	var favBox = $("<div class='media'><div class='media-body'><h4 class='media-right'>Location: " + e.event_name +"</h4></div>");
		        var del = $("<div class='list-remove'><span class='glyphicon glyphicon-remove'></span></div>").click(removeFromFavourites(e.event_id));
		        $(".list-content-items").append(del,favBox);
		    });
		}

		var initMap = function(event)
		{	
			var event_coords = {lat: event.lat, lng: event.lng};
			navigator.geolocation.getCurrentPosition(function (position) { 
	        	//Get the user's current location!
			    var lat = position.coords.latitude;                    
			    var long = position.coords.longitude;                 
			    var coords = new google.maps.LatLng(lat, long); /*Set Variable for map*/

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
			 
			    directionsService.route(request, function(response, status) {
			    	if (status == google.maps.DirectionsStatus.OK) {
			        	directionsDisplay.setDirections(response);
			        }
			    });

			});
		}

		//initialise the functions
		var init = function(){
			$searchBox.focus();
			// Get all authors through jSon and push into array
			authorModel.getAllAuthors();
			searchFunction();
			displayFavourites();
			showAuthorData();
			showEventData();
			
		}

		init();
		window.initMap = initMap;

	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	var $output = $(".output");
	var $siteUrl = window.location.href;
	var gAuthors;

		getAllAuthors = function(){
			$.getJSON("scripts/authors.json", function(authors){
	            gAuthors = authors;
		    });
		}


		searchAuthors = function(search_term){
			$output.empty();
			var searchResults = [];
				$.grep(gAuthors, function(result, i){
					if(result.name.toLowerCase().indexOf(search_term.toLowerCase()) !== -1){
						searchResults.push(result);
					}

				});
			return searchResults;			
		}
			
	module.exports={
		getAllAuthors: getAllAuthors,
		searchAuthors:  searchAuthors
	}

/***/ }
/******/ ]);