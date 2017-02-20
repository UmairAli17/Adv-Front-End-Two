var authorModel = require('./authorModel.js');

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

