define(
['jquery'], function(jquery) {
    var jQuery = jquery;

    return {
        responsePlugins: [],
        initializePlugins: function(pluginNames) {
            var that = this;

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

            jQuery.each(that.responsePlugins, function(index, plugin) {
                console.log("Asking "+plugin.name+" about "+input);
                responses[plugin.name] = plugin.reply({
                    rawInput: input,
                    jQuery: jQuery
                });
            });
            return responses;
        }
    }
});
