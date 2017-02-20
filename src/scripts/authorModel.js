var getAllAuthors = function(){
	$.getJSON("scripts/authors.json",function(authors){
       $.each(authors, function(i,author){
            console.log(author.name);
        });


    });
}

var searchAuthors = function(search_term){
	var $searchResults = [];
	$.getJSON("scripts/authors.json", function(authors){
		$.each(authors, function(i, author) {
			var $searchResults = $.grep(author, function(result){
				return result.name.toLowerCase().indexOf(search_term.toLowerCase()) != -1
			});
			return $searchResults;

		});
	});
	
}


//ALSO TRIED WITH AN IF STATEMENT - NO SUCH LUCK - UNDEFINED
// var searchAuthorsIf = function(search_term){
// 	var searchResults = [];
// 	$.getJSON("scripts/authors.json", function(authors){
// 		$.each(authors, function(i, author) {
// 			var searchResults = $.grep(author, function(result){
// 				if(result.name.toLowerCase().indexOf(search_term.toLowerCase()) != -1){
// 					searchResults.push(result.name);
// 					console.log(searchResults);
// 				}
// 			});

// 		});
// 	});
	
// }

module.exports={
	author: getAllAuthors,
	search_authors:  searchAuthors,
	search_authors_if: searchAuthorsIf
}