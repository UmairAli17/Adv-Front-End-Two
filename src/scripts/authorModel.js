var $output = $(".output");
var $siteUrl = window.location.href;
var gAuthors;

	getAllAuthors = function(){
		$.getJSON("scripts/authors.json", function(authors){
            gAuthors = authors;
	    });
	}


	searchAuthors = function(search_term){
		$output.empty();
		var searchResults = [];
			$.grep(gAuthors, function(result, i){
				if(result.name.toLowerCase().indexOf(search_term.toLowerCase()) !== -1){
					searchResults.push(result);
				}

			});
		return searchResults;			
	}
		
module.exports={
	getAllAuthors: getAllAuthors,
	searchAuthors:  searchAuthors
}