var PLUGINS = ['./plugins/greet', './plugins/weather'];
var jQuery =require('jQuery');
var requirejs = require('requirejs');
var repl = require("repl");


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

var Rei = { responsePlugins: [],
        

initializePlugins: function(pluginNames) {
    var that = this;


jQuery.each(pluginNames, function(index,name) {
requirejs([name],
function   (plugin) {
    that.responsePlugins.push(plugin);

});

});
},




    handleQuery: function(input) {
        var that = this;
    var responses = [];

jQuery.each(that.responsePlugins, function(index,plugin) {
    responses[plugin.name] = plugin.reply({ rawInput: input, jQuery: jQuery } );
});
    return responses;
}};

Rei.initializePlugins(PLUGINS);

// Hack up the REPL to do something useful for basic text input
function reiEval(cmd, context, filename, callback) {
    cmd = cmd.replace(/^./,'').replace(/.$/,'');
        var response = Rei.handleQuery(cmd);
        callback(null, response);
}


//A "local" node repl with a custom prompt
var local = repl.start({ eval: reiEval, prompt: "Say something? "    } );
