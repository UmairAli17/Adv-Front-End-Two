var authorModel = require('./authorModel.js');
var profile = require('./profile.js');

//Searchbox 
	var $searchBox = $("#search");
	var $output = $(".output");


	/**
	 * [trim search value - ensure user cannot search through an empty value]
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	var trim = function(str) {
		if(str==="" && !isNaN(str))
		{
			//do not validate as its empty and a number
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
			var $res_line = $("<a href='profiles.html'><li class='author_search_det'>"+res.name+"</li></a>").click(profile.loadAuthorProfile(res))
			$output.prepend($res_line);
		});
	}

	var init = function(){
		$searchBox.focus();
		// Get all authors through jSon and push into array
		authorModel.getAllAuthors();
		searchFunction();
		$('.go-back').click(function(){
	        parent.history.back();
	        return false;
    	});
	}


$(document).ready(function(){
	init();
});