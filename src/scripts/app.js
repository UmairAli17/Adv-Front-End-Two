var authorModel = require('./authorModel.js');

$(document).ready(function(){

	//Searchbox 
	var $searchBox = $("#search");
	var $output = $(".output");
	var gAuthors;

	
	/**
	 * [trim search value - ensure user cannot search through an empty value]
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	var trim = function(str) {
		if(str==="")
		{
			//do not validate as its empty
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
			var $res_line = $("<a href='profiles.html'><li class='author_search_det'>"+res.name+"</li></a>").click(loadAuthorProfile(res))
			$output.prepend($res_line);
		});
	}

	/**
	 * [loadAuthorProfile description]
	 * @param  {[object]} author [author objects]
	 * @return {[type]}        [callback]
	 */
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
			var evBox = $("<div class='col-xs-12 col-sm-12 prof-item'><div class='col-xs-10 col-offset-1 col-sm-10 col-sm-offset-1 event-details'><li class='no-bullets'>"+" "+event.event_name+"</li><li class='no-bullets'>"+"Location:"+event.event_location+"</li></div></div>");
			var marker = $("<a class='location-marker' href='map.html'><div class='col-xs-2 col-sm-12 btn-rm'><span class='glyphicon glyphicon-map-marker prof-marker'></span></div></a>").click(eventLocationMap(event))
			var favs = $("<div class='col-xs-2 col-sm-12 btn-rm'><span class='glyphicon glyphicon-star add'></span></div>").click(addToFavourites(event));
			$(".prof-list").prepend(marker,  favs, evBox);
			
		});
		
	}

	var showAuthorData = function()
	{
		if(localStorage.getItem('authors') != null)
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
	}

	var eventLocationMap = function(event)
	{
		return function(){
			if (typeof(localStorage) != 'undefined' ) {
			    localStorage.setItem('events', JSON.stringify(event));
			    showEventData();
			}
			else {
			    console.log('Oh dear.. we may not work on your device :(')
			}
		}
	}


    var showEventData = function()
	{
		if(localStorage.getItem('events') != null)
		{
			var event = $.parseJSON(localStorage.getItem('events'));
			var event_name = event.event_name;
			$(".event-title").append(event_name)
			initMap(event);
		}

	}

	var addToFavourites = function(event)
	{
		return function()
		{
			// Get the old items and if there are any -> pass to an array
			var currentFavs = JSON.parse(localStorage.getItem('favourites')) || [];
			//Get the new event
			var newFav = event;
			//send it that array
			currentFavs.push(newFav);
			localStorage.setItem('favourites', JSON.stringify(currentFavs));
			//send to the favourites
			window.location.href = "/favourites.html";
		}
	}
    

	var displayFavourites = function()
	{
		if(localStorage.getItem('favourites') != null)
		{
			var favourites = $.parseJSON(localStorage.getItem('favourites'));
			var filteredFavs = favourites.filter(function(itm, i, e) 
			{
	    		return i === favourites.indexOf(itm)
	    	});
			loopFavourites(filteredFavs);
		}
	}

	var loopFavourites = function(loop)
	{
		var output = $.each(loop, function(index, e) {
	    	var favBox = $("<div class='media'><div class='media-body'><h4 class='media-right'>Location: " + e.event_name +"</h4></div>");
	        $(".list-content-items").append(favBox);
	    });
	}

	var initMap = function(event)
	{
		var coordinates = {lat: event.lat, lng: event.lng};
        var map = new google.maps.Map($("#map")[0], {
          zoom: 15,
          center: coordinates
        });
        var marker = new google.maps.Marker({
          position: coordinates,
          map: map
        });

    }

	//initialise the functions
	var init = function(){

		$searchBox.focus();
		// Get all authors through jSon and push into array
		authorModel.getAllAuthors();
		searchFunction();
		displayFavourites();
		showAuthorData();
		showEventData();
		
	}

	init();
	window.initMap = initMap;

});