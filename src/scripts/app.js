var authorModel = require('./authorModel.js');

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
			var evBox = $("<div class='col-xs-12 col-sm-12 prof-item'><div class='col-xs-10 col-offset-1 col-sm-10 col-sm-offset-1 event-details'><li class='no-bullets'>"+" "+event.event_name+"</li><li class='no-bullets'>"+"Location:"+event.event_location+"</li></div><a href='favourites.html'><span class='glyphicon glyphicon-star add'></span></a></div>");
			var marker = $("<a class='location-marker' href='map.html'><div class='col-xs-2 col-sm-12 btn-rm'><span class='glyphicon glyphicon-map-marker prof-marker'></span></div></a>").click(eventLocationMap(event))
			$(".prof-list").append(marker, evBox);
			
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
		return function(){
			console.log(e.event_name);
		}
	}


	//initialise the functions
	var init = function(){
		$searchBox.focus();
		// Get all authors through jSon and push into array
		authorModel.getAllAuthors();
		searchFunction();
		showAuthorData();
	}

	init();


});