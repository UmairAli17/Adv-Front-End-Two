/*TESTING */

/*function Author(name)
{
	this.name=name;
	this.year=year;
}
var authors=[];
authors.push(new Author("Brent Weeks"));
authors.push(new Author("Eoin Colfer"));*/




var getAllAuthors = function(){
	$.getJSON("scripts/authors.json",function(authors){
       $.each(authors, function(i,author){
            console.log(author.name);
        });


    });
}

var searchAuthors = function(search_term){
	var searchResults = [];
	$.getJSON("scripts/authors.json", function(authors){
		$.grep(authors, function(result, i){
			if(result.name.toLowerCase().indexOf(search_term.toLowerCase()) != -1){
				searchResults.push(result.name);
				console.log(searchResults);
			}
		});
		
	});

}
module.exports={
	author: getAllAuthors,
	search_authors:  searchAuthors,
}