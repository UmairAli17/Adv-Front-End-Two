var authorModel = require('./authorModel.js');

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
		//$.each(searchResults, function(i, res) {
			var $res_line = $("<li class='author_search_det'>"+searchResults.name+"</li>").click(loadAuthorProfile(searchResults))
			$output.prepend($res_line);
		//});
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

