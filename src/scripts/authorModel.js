function authorModel(){
	$.getJSON("scripts/authors.json",function(authors){
       $.each(authors, function(i,author){
            console.log(author.name);
        })


    });
}

module.exports={
	author : authorModel 
}


// function authorsCall(callback){
// 	$.getJSON("scripts/authors.json", function (callback = data) {
// 		return $data;
// 	});
// }

// function authorModel(){
// 	authorsCall(authors);
//     $.each(authors, function(i,author){
//         console.log(author.name);
//     })
// }

// module.exports={
// 	author : authorModel 
// }