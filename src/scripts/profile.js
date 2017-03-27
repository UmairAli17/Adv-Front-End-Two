var map = require('./map.js');
var favourites = require('./favourites.js');


	/**
	 * [loadAuthorProfile description]
	 * @param  {[object]} author [author objects]
	 * @return {[object]}        [callback]
	 */
	var loadAuthorProfile = function(author)
	{
		return function(){
			if (typeof(localStorage) != 'undefined' ) {
			    localStorage.setItem('authors', JSON.stringify(author));
			    profile.showAuthorData();
			}
			else {
			    console.log('Oh dear.. we may not work on your device :(')
			}
		}
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


	var listAuthorEvents = function(author)
	{
		var events = author.events;
		$.each(events, function(index, event) {
			var evBox = $("<div class='col-xs-12 col-sm-12 prof-item'><div class='col-xs-10 col-offset-1 col-sm-10 col-sm-offset-1 event-details'><li class='no-bullets'>"+" "+event.event_name+"</li><li class='no-bullets'>"+"Location:"+event.event_location+"</li></div></div>");
			var marker = $("<a class='location-marker' href='map.html'><div class='col-xs-2 col-sm-12 btn-rm'><span class='glyphicon glyphicon-map-marker prof-marker'></span></div></a>").click(map.eventLocationMap(event))
            var favs = $("<a href='favourites.html'><div class='col-xs-2 col-sm-12 btn-rm'><span class='glyphicon glyphicon-star add'></span></div></a>").click(favourites.addToFavourites(event));
			$(".prof-list").prepend(marker,  favs, evBox);
			
		});
		
	}


	

	var init = function ()
	{
		showAuthorData()
		$('.go-back').click(function(){
	        parent.history.back();
	        return false;
    	});
	}


$(document).ready(function(){
	init();	
});


module.exports={
	loadAuthorProfile: loadAuthorProfile,
	showAuthorData: showAuthorData
}
	