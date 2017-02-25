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
			$.each(searchResults, function(i, res) {
				var $res_line = $("<li class='author_search_det'>"+res.name+"</li>").click(loadAuthorProfile(res))
				$output.prepend($res_line);
			});
		}

		loadAuthorProfile = function(author)
		{
			return function(){
				console.log(author);
				if (typeof(sessionStorage) != 'undefined' ) {
				    localStorage.setItem('authors', JSON.stringify(author));
				}
				else {
				    console.log('Oh dear.. we may not work on your device :(')
				}
			}
		}

		loadPage = function(redirectUrl)
		{

			window.location.href = redirectUrl;
		}

		showAuthorData = function()
		{
			//load profile page
			loadPage("profiles.html");
			//console.log(localStorage.getItem('authors'));
			author = $.parseJSON(localStorage["authors"]);
			console.log(author.name);
			$(".prof-name").append(author.name);
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

	var $output = $(".output");
	var $siteUrl = window.location.href;

	getAllAuthors = function(){
		$.getJSON("scripts/authors.json",function(authors){
	       $.each(authors, function(i,author){
	            console.log(author.name);
	        });


	    });
	}

	loadPage = function(redirectUrl)
	{

		window.location.href = redirectUrl;
	}

	showAuthorData = function()
	{
		//load profile page
		loadPage("profiles.html");
		//console.log(localStorage.getItem('authors'));
		author = $.parseJSON(localStorage["authors"]);
		console.log(author.name);
		$(".prof-name").append(author.name);
	}

	loadAuthorProfile = function(author)
	{
		return function(){
			console.log(author);
			if (typeof(sessionStorage) != 'undefined' ) {
			    localStorage.setItem('authors', JSON.stringify(author));
			}
			else {
			    console.log('Oh dear.. we may not work on your device :(')
			}
		}
	}

	 searchAuthors = function(search_term){
		$output.empty();
		var searchResults = [];
		$.getJSON("scripts/authors.json", function(authors){
			$.grep(authors, function(result, i){
				if(result.name.toLowerCase().indexOf(search_term.toLowerCase()) !== -1){
					searchResults.push(result);
					//console.log(searchResults);
					$output.empty();
					//display each result in a list
				}			
			});
		});
		return searchResults;
	}


	/**WORKING SEARCH ***/

	/*
	var searchAuthors = function(search_term){
		$output.empty();
		var searchResults = [];
			$.grep(authors, function(result, i){
				if(result.name.toLowerCase().indexOf(search_term.toLowerCase()) !== -1){
					searchResults.push(result);
					console.log(searchResults);
					$output.empty();
					//display each result in a list
					 $.each(searchResults, function(i, res) {
					 	var $res_line = $("<li class='author_search_det'>"+res.name+"</li>").click(loadAuthorProfile(res))
					 	$output.prepend($res_line);
					 });
				}			
			});
	}
	*/
	module.exports={
		author: getAllAuthors,
		searchAuthors:  searchAuthors
	}

/***/ }
/******/ ]);