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
		}
	}


	//Get all the favourites and push into an array
    var getFavsArray = function()
    {
    	var currentFavs = JSON.parse(localStorage.getItem('favourites')) || [];
    	return currentFavs;
	}


	var displayFavourites = function()
	{
		if(localStorage.getItem('favourites') != null)
		{
			var favourites = $.parseJSON(localStorage.getItem('favourites'));
			var output = $.each(favourites, function(index, e) {
		    	var favBox = $("<div class='media'><div class='media-body'><h4 class='media-right'>Location: " + e.event_name +"</h4></div>");
		        var del = $("<div class='list-remove'><span class='glyphicon glyphicon-remove'></span></div>").click(removeFromFavourites(e.event_id));
		        $(".list-content-items").append(del,favBox);
	    	});
		}
	}

	var removeFromFavourites = function (event) 
	{
		return function()
		{
			if(localStorage.getItem('favourites') != null)
			{
				var favEvents = getFavsArray();
				var uniqueID = favEvents.indexOf(event.event_id);
				if(uniqueID === -1) 
				{
					favEvents.splice(uniqueID, 1);
				}
				localStorage.setItem("favourites", JSON.stringify(favEvents))
				location.reload();
			}

		}
	}

	var init = function ()
	{
		displayFavourites()
		$('.go-back').click(function(){
	        parent.history.back();
	        return false;
    	});
	}

$(document).ready(function() {
	init();
});

module.exports = {
	addToFavourites: addToFavourites,
}