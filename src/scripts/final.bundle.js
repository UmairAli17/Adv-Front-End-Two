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
			$searchBox.keyup(function(e){
				compSearch();
			});
		}

		var compSearch = function(){
			var $search_term = $searchBox.val().toLowerCase();
			if(trim($search_term))
			{
				//console.log($searchVal);
				searchedAuthors = authorModel.search_authors($search_term);
				//console.log(outputAuthors(searchedAuthors));
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



/***/ },
/* 1 */
/***/ function(module, exports) {

	/*TESTING */

	/*function Author(name)
	{
		this.name=name;
		this.year=year;
	}
	var authors=[];
	authors.push(new Author("Brent Weeks"));
	authors.push(new Author("Eoin Colfer"));*/




	var getAllAuthors = function(){
		$.getJSON("scripts/authors.json",function(authors){
	       $.each(authors, function(i,author){
	            console.log(author.name);
	        });


	    });
	}

	var searchAuthors = function(search_term){
		var searchResults = [];
		$.getJSON("scripts/authors.json", function(authors){
			$.grep(authors, function(result, i){
				if(result.name.toLowerCase().indexOf(search_term.toLowerCase()) != -1){
					searchResults.push(result.name);
					console.log(searchResults);
				}
			});
			
		});

	}
	module.exports={
		author: getAllAuthors,
		search_authors:  searchAuthors,
	}

/***/ }
/******/ ]);