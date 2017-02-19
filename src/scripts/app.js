var authors = require('./authorModel.js');

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

