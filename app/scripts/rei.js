define(
[
    'jquery',
    'pos',
    'stem'
], function(jquery, pos, stem) {
    var jQuery = jquery,
        Pos = pos,
        Stemmer = stem;

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

            jQuery.each(tags, function(idx, tag) {
                // stem each token in the list of token+POS
                // and add the stem to the end of the list
                // yielding [token, POS, stem]
                tag.push(Stemmer.stem(tag[0]));
            });

            var args = {
                rawInput: input,
                tokens: tags,
                jQuery: jQuery,
                sessionStorage: that.sessionStorage,
                persistentStorage: that.persistentStorage
            };
            console.log(args);

            jQuery.each(that.responsePlugins, function(index, plugin) {
                console.log("Asking "+plugin.name+" about "+input);
                responses[plugin.name] = plugin.reply(args);
            });
            return responses;
        }
    }
});
