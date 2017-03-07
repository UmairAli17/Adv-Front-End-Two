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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var authorModel = __webpack_require__(1);

$(document).ready(function(){

	//Searchbox 
	var $searchBox = $("#search");
	var $output = $(".output");
	    var gAuthors;

	

	var trim = function(str) {
		if(str==="")
		{
			//do not validate as its empty
			return false;
		}
		return true;
	}

	var searchFunction = function(){
		//when something is entered into the searchbox then do:
		$searchBox.keydown(function(e){
			compSearch();
		});
	}
	

	var compSearch = function(){
		var $search_term = $searchBox.val().toLowerCase();
		if(trim($search_term))
		{
			var searchedAuthors = authorModel.searchAuthors($search_term.toLowerCase());
			outputAuthors(searchedAuthors);
		}
	}


	var outputAuthors = function(searchResults){
			 $.each(searchResults, function(index, res) {
				var $res_line = $("<a href='profiles.html'><li class='author_search_det'>"+res.name+"</li></a>").click(loadAuthorProfile(res))
				$output.prepend($res_line);
			 });
		}

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
			var evBox = $("<div class='col-xs-12 col-sm-12 prof-list'><div class='col-xs-12 col-sm-12 prof-item'><a class='location-marker' href='map.html'><div class='col-xs-2 col-sm-12 btn-rm'><span class='glyphicon glyphicon-map-marker prof-marker'></span></div></a><div class='col-xs-10 col-offset-1 col-sm-10 col-sm-offset-1 event-details'><li class='no-bullets'>"+" "+event.event_name+"</li><li class='no-bullets'>"+"Location:"+event.event_location+"</li></div><a href='favourites.html'><span class='glyphicon glyphicon-star add'></span></a></div></div>");
			$(".event-profile").append(evBox);
			eventLocationMap(event);
		});
		
	}

	var showAuthorData = function()
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

	var eventLocationMap = function(e)
	{
		//on the location marker being clicked, perform the following:
		$('.prof-list').on('click',".location-marker", function(){
			console.log($(this).id);
		});

	}


	//initialise the functions
	var init = function(){
		$searchBox.focus();
		// Get all authors through jSon and push into array
		authorModel.getAllAuthors();
		searchFunction();
		showAuthorData();
		// eventLocationMap(event);
	}

	init();


});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);