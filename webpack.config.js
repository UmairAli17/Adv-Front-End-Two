var webpack = require('webpack');
var path = require('path');


var config = {
  // I set the root of the project to '/src/' as that is where I am developing it
  context: __dirname + '/src',

  entry: {
  	//this is the file that will be bundled
    // app: __dirname + '/src/scripts/app.js',
    search: __dirname + '/src/scripts/search.js',
    profile: __dirname + '/src/scripts/profile.js',
    map: __dirname + '/src/scripts/map.js',
    favourites: __dirname + '/src/scripts/favourites.js'
  },
  output: {
  	//this is the folder where the final bundled file will be saved 
    path: __dirname + '/src/scripts', 
    //the name specified for the final bundle
    filename: "[name].bundle.js"
  },
  //Watch for any changes
  watch: true
};

module.exports = config;