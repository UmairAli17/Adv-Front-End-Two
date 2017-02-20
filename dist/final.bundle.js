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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var getAllAuthors = function(){
	$.getJSON("scripts/authors.json",function(authors){
       $.each(authors, function(i,author){
            console.log(author.name);
        });


    });
}

var searchAuthors = function(search_term){
	var $searchResults = [];
	$.getJSON("scripts/authors.json", function(authors){
		$.each(authors, function(i, author) {
			var $searchResults = $.grep(author, function(result){
				return result.name.toLowerCase().indexOf(search_term.toLowerCase()) != -1
			});
			return $searchResults;

		});
	});
	
}


//ALSO TRIED WITH AN IF STATEMENT - NO SUCH LUCK - UNDEFINED
// var searchAuthorsIf = function(search_term){
// 	var searchResults = [];
// 	$.getJSON("scripts/authors.json", function(authors){
// 		$.each(authors, function(i, author) {
// 			var searchResults = $.grep(author, function(result){
// 				if(result.name.toLowerCase().indexOf(search_term.toLowerCase()) != -1){
// 					searchResults.push(result.name);
// 					console.log(searchResults);
// 				}
// 			});

// 		});
// 	});
	
// }

module.exports={
	author: getAllAuthors,
	search_authors:  searchAuthors,
	search_authors_if: searchAuthorsIf
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var authorModel = __webpack_require__(0);

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
		$searchBox.keyup(function(e){
			compSearch();
		});
	}

	var compSearch = function(){
		var $search_term = $searchBox.val().toLowerCase();
		if(trim($search_term))
		{
			//console.log($searchVal);
			var searchedAuthors = authorModel.search_authors($search_term);
			console.log(searchedAuthors);

			// also tried the following and it doesnt work..
			// outputAuthors($searchedAuthors);
		}
	}



	var outputAuthors = function(authors){
	   $.each(authors, function(author){
	        console.log(author.name);
	    })
	}

	//initialise the functions
	var init = function(){
		$searchBox.focus();
		searchFunction();
	}

	init();


});



/***/ })
/******/ ]);