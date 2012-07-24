var PLUGINS = ['./plugins/greet', './plugins/weather'];
var jQuery =require('jQuery');
var repl = require("repl");
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

var Rei;
requirejs(['./rei'], function(rei) { Rei = rei } );
Rei.initializePlugins(PLUGINS);

// Hack up the REPL to do something useful for basic text input
function reiEval(cmd, context, filename, callback) {
    cmd = cmd.replace(/^./,'').replace(/.$/,'');
        var response = Rei.handleQuery(cmd);
        callback(null, response);
}


//A "local" node repl with a custom prompt
var local = repl.start({ eval: reiEval, prompt: "Say something? "    } );
