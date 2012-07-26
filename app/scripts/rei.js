define(
[
    'jquery',
    'pos'
], function(jquery, pos) {
    var jQuery = jquery,
        Pos = pos;
    console.log("Pos",Pos);

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
            var tokens = new Pos.Lexer().lex(input);
            var tags = new Pos.Tagger().tag(tokens);
            var args = {
                rawInput: input,
                tokens: tokens,
                pos: tags,
                jQuery: jQuery,
                sessionStorage: that.sessionStorage,
                persistentStorage: that.persistentStorage
            };
            // TODO: do some NLP here

            jQuery.each(that.responsePlugins, function(index, plugin) {
                console.log("Asking "+plugin.name+" about "+input);
                responses[plugin.name] = plugin.reply(args);
            });
            return responses;
        }
    }
});
