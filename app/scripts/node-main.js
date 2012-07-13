var PLUGINS = ['./plugins/greet', './plugins/weather'];

var jQuery =require('jQuery');
var requirejs = require('requirejs');

requirejs.config({
    //Use node's special variable __dirname to
    //get the directory containing this file.
    //Useful if building a library that will
    //be used in node but does not require the
    //use of node outside
    baseUrl: __dirname,

    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

var responsePlugins = [];

jQuery.each(PLUGINS, function(index,name) {
requirejs([name],
function   (plugin) {
    responsePlugins.push(plugin);
});

});



jQuery.each(responsePlugins, function(index,plugin) {
    plugin = responsePlugins[index];  
    console.log(plugin.reply());
});
