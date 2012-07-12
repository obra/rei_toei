var PLUGINS = ["greet", "convert", "google"];

plugins = {};

plugins.greet = {
    init: function () {
        console.log("GREET!");
    },
    reply: function() {
        return 'Hi there!';
    }
}



for (var i in PLUGINS) {
    var name = PLUGINS[i];
    plugins[name] && plugins[name].init()  ;
}


function query(queryString) {
var results = {};
for (var i in PLUGINS) {
    var name = PLUGINS[i];
    if (plugins[name]) {
        results[name] =  plugins[name].reply(queryString) ;
    }
}

return results;

}


    var includes = {
        'plugins': {'items': PLUGINS, 'callback': function () {
            // plugins have been loaded to the system now. operate on them!

            for (var pluginName in plugins) {
                plugins[pluginName].init();
            }
        }}
    };

    for (var packageName in includes) {
        var pkg = includes[packageName];
        console.log("package "+pkg);
        var includeItems = pkg.items;
        var includePaths = [];
        var includeCallback = 'callback' in pkg? pkg.callback: function() {};

        for (var i = 0; i < includeItems.length; i++) {
            var moduleName = includeItems[i];

            includePaths.push(moduleName);
        }
        
    }






var val = process.argv[2];
    console.log("Q: "+ val);
    console.log("A: "+JSON.stringify(query(val)));
