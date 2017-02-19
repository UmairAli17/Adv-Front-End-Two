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

	var authors = __webpack_require__(1);

	$(document).ready(function(){

		//Searchbox 
		
		var $searchBox = $("#search");
		

		var trim = function(str) {
			if(str==="" && isNaN(str))
			{
				//do not validate
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
			var $searchVal = $searchBox.val();
			console.log($searchVal);
			if(trim($searchVal))
			{
				//run here the query for searching through json
			}
		}

		//initialise the functions
		var init = function(){
			$searchBox.focus();
			searchFunction();
		}

		init();


	});



/***/ },
/* 1 */
/***/ function(module, exports) {

	function authorModel(){
		$.getJSON("scripts/authors.json",function(authors){
	       $.each(authors, function(i,author){
	            console.log(author.name);
	        })


	    });
	}

	module.exports={
		author : authorModel 
	}


	// function authorsCall(callback){
	// 	$.getJSON("scripts/authors.json", function (callback = data) {
	// 		return $data;
	// 	});
	// }

	// function authorModel(){
	// 	authorsCall(authors);
	//     $.each(authors, function(i,author){
	//         console.log(author.name);
	//     })
	// }

	// module.exports={
	// 	author : authorModel 
	// }

/***/ }
/******/ ]);