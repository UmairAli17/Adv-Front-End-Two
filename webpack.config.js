var webpack = require('webpack');
var path = require('path');


var config = {
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source
  entry: {
    app: __dirname + '/src/scripts/app.js',
  },
  output: {
    path: __dirname + '/src/scripts', // `dist` is the destination
    filename: 'final.bundle.js',
  },
  watch: true
};

module.exports = config;