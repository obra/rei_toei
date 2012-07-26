define(
['jquery', 'pos', 'stem'], function(jquery, pos, stem) {
    var jQuery = jquery,
        Pos = pos,
        Stemmer = stem;

    var _DB_NAME = 'rei_toei';
    return {
        responsePlugins: [],
        persistentStorage: {},
        sessionStorage: {},
        storage: window.localStorage,

        getFactoid: function(query) {
            var key = jQuery.trim(query.toLowerCase());
            console.log("Looking for a factoid called: " + key);
            var value = this.storage.getItem("factoid." + key);
            return value;
        },
        putFactoid: function(key, value) {
            key = jQuery.trim(key.toLowerCase());
            console.log("Learning that '" + key + "' is '" + value + "'");
            this.storage.setItem("factoid." + key, value);
        },
        dumpFactoids: function() {
            var data = {};
        console.log("dumpFactoids");
            for (i = 0; i <= this.storage.length - 1; i++) {
                console.log("I is "+i);
                key = this.storage.key(i);
                console.log("key is "+key);
                if ( res = key.match(/^factoid\.(.*)$/)) { 
                    console.log("Grabbing "+key);
                    data[res[1]] = this.storage.getItem(key);
                }
            }
            return data;
        },


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
                    console.log("Loaded plugin: " + name);
                });

            });
        },
        initialize: function(pluginNames) {
            this.initializePlugins(pluginNames);
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
                console.log("Asking " + plugin.name + " about " + input);
                responses[plugin.name] = plugin.reply(args);
            });
            return responses;
        }
    }
});
