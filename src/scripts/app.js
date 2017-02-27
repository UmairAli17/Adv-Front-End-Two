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
			// console.log(searchedAuthors);
			outputAuthors(searchedAuthors);
		}
	}


	var outputAuthors = function(searchResults){

		// var authors = $.map(searchResults, function(index, author) {
		// 	console.log(author.name);
		// })
		// var searchResults = [];
		// $.each(searchResults, function(index, res) {
			var $res_line = $("<a href='profiles.html'><li class='author_search_det'>"+searchResults.name+"</li></a>").click(loadAuthorProfile(searchResults))
			$output.prepend($res_line);
		// });
		// return searchResults;
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

	var loadPage = function(redirectUrl)
	{

		window.location.href = redirectUrl;
	}

	var showAuthorData = function()
	{
		//load profile page
		var author = $.parseJSON(localStorage.getItem('authors'));
		console.log(author[0].events[0].event_name);
		var author_name = author[0].name;
		var author_description = author[0].author_description;
		var img = author[0].img_url;
		var event_name = author[0].events[0].event_name;
		$(".prof-name").append(author_name);
		$(".prof-desc").append(author_description);
		$(".prof-large-img").attr("src", img);
		//show events...
	}


	//initialise the functions
	var init = function(){
		$searchBox.focus();
		searchFunction();
		showAuthorData();

	}

	init();


});

