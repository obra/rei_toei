define(
['jquery'], function(jquery) {
    var jQuery = jquery;

    return {
        responsePlugins: [],
        persistentStorage: {},
        sessionStorage: {},
        initializePlugins: function(pluginNames) {
            var that = this;

            // Walk through the list of plugins passed in and load it into
            // memory. Add it to the list of plugins we can use
            //
            // TODO: hook an 'init' method in the plugins
            jQuery.each(pluginNames, function(index, name) {
                requirejs([name],

                function(plugin) {
                    that.responsePlugins.push(plugin);
                    console.log("Loaded plugin: "+name);
                });

            });
        },

        handleQuery: function(input) {
            var that = this;
            var responses = {};

            // TODO: do some NLP here

            jQuery.each(that.responsePlugins, function(index, plugin) {
                console.log("Asking "+plugin.name+" about "+input);
                responses[plugin.name] = plugin.reply({
                    rawInput: input,
                    jQuery: jQuery,
                    sessionStorage: that.sessionStorage,
                    persistentStorage: that.persistentStorage
                });
            });
            return responses;
        }
    }
});
