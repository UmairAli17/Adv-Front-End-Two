var $output = $(".output");
var $siteUrl = window.location.href;

getAllAuthors = function(){
	$.getJSON("scripts/authors.json",function(authors){
       $.each(authors, function(i,author){
            console.log(author.name);
        });
    });
}

// loadPage = function(redirectUrl)
// {

// 	window.location.href = redirectUrl;
// }

// showAuthorData = function()
// {
// 	//load profile page
// 	loadPage("profiles.html");
// 	// localStorage.getItem('authors');
// 	var author = JSON.parse(localStorage.getItem('authors'));
// 	console.log(author);
// 	$(".prof-name").appendTo(author.name);
// }

// loadAuthorProfile = function(author)
// {
// 	return function(){
// 		console.log(author);
// 		if (typeof(localStorage) != 'undefined' ) {
// 		    localStorage.setItem('authors', JSON.stringify(author));
// 		    showAuthorData();
// 		}
// 		else {
// 		    console.log('Oh dear.. we may not work on your device :(')
// 		}
// 	}
// }

searchAuthors = function(search_term){
	$output.empty();
	var searchResults = [];
	$.getJSON("scripts/authors.json", function(authors){
		$.grep(authors, function(result, i){
			if(result.name.toLowerCase().indexOf(search_term.toLowerCase()) !== -1){
				searchResults.push(result);

			}

		});
		// return searchResults;
	});
	return searchResults;			

}	


/**WORKING SEARCH ***/


// var searchAuthors = function(search_term){
// 	$output.empty();
// 	var searchResults = [];
// 	$.getJSON("scripts/authors.json", function(authors){
// 		$.grep(authors, function(result, i){
// 			if(result.name.toLowerCase().indexOf(search_term.toLowerCase()) !== -1){
// 				searchResults.push(result);
// 				//console.log(searchResults);
// 				$output.empty();
// 				//display each result in a list
// 				 $.each(searchResults, function(i, res) {
// 				 	var $res_line = $("<li class='author_search_det'>"+res.name+"</li>").click(loadAuthorProfile(res))
// 				 	$output.prepend($res_line);
// 				 });
// 			}			
// 		});
// 	});
// }

module.exports={
	author: getAllAuthors,
	searchAuthors:  searchAuthors
}