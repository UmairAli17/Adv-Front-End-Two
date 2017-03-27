	
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
/**
	 * [initMap Draw Map - Get Current User Position with GeoLocation and 
	 * then Map the Destination from Local Storage]
	 * @param  {[type]} event [object from local storage]
	 * @return {[type]}       [draw map]
	 */
	var initMap = function(event)
	{	

		/*
			Set the event coordinates (lat, lng) to an object: event_coords
		 */
		var event_coords = {lat: event.lat, lng: event.lng};
		navigator.geolocation.getCurrentPosition(function (position) { 
        
		    var lat = position.coords.latitude;                    
		    var long = position.coords.longitude;                 
		    var coords = new google.maps.LatLng(lat, long);

		    var directionsService = new google.maps.DirectionsService();
		    var directionsDisplay = new google.maps.DirectionsRenderer();
		  
		    var map = new google.maps.Map($("#map")[0], {
	          zoom: 15,
	          center: coords
	        });
	  
  
	     	directionsDisplay.setMap(map);
		    var request = {
		       origin:coords, 
		       destination: event_coords,
		       travelMode: google.maps.TravelMode.DRIVING,
		     };

		    directionsService.route(request, function (response, status) {
		       if (status == google.maps.DirectionsStatus.OK) {
		        	directionsDisplay.setDirections(response);
		    	}
		    });         


		});
	}

	var init = function ()
	{
		showEventData()
		$('.go-back').click(function(){
	        parent.history.back();
	        return false;
    	});
	}



$(document).ready(function() {
	init();
});

module.exports = {
	eventLocationMap : eventLocationMap
}