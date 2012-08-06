
define(['plugins/factoids'], function() {
    return {
        name: 'factoids',
        reply: function(args) {
            var matches;
            if (matches = args.rawInput.match(/^factoid (?:grab|fetch)\s*(.*)$/i)) {
                return { confidence: 1, message: this.learnFromURL(matches[1])};
            }
            if (args.rawInput.match(/^factoid braindump$/i)) {
                return { confidence: 1, message: Rei.dumpFactoids()};
            }
            if (matches = args.rawInput.match(/^\s*(.*?)\sis\s(.*)$/i)) {
                var key = matches[1];
                var value = matches[2];
                if (!key.match(/^what$/i)) {
                    this.putFactoid(key, value);
                    return{ confidence:1, message: "Ok. I've made a note of it"};
                }
            }
            if (matches = args.rawInput.match(/^(.*)\?$/)) {

            var query = matches[1].replace(/^What is/i, '');
            var result = this.getFactoid(query);
            if (result !== null) {
                return { confidence: 1, message: result};
            } else {
                return { confidence: 0, message: "Nothing there. Teach me?"};
            }
        },
        putFactoid: function(key, value) {
            // TODO - check for existing factoid with this name here
            Rei.putFactoid(key, value);
        },
        getFactoid: function(key) {
            return Rei.getFactoid(key);
        },
        dumpFactoids: function() {

        },
        learnFromURL: function(url) {
            handleResult = function (data, textStatus, jqXHR) {
                console.log("factoid#learnFromURL: fetched "+data.length+"chars, ");
                var arrayOfLines = data.match(/[^\r\n]+/g);
                for (var i = 0; i < arrayOfLines.length; i++) {
                    var matches = arrayOfLines[i].match(/^\s*(.*?)=>\s*(.*)\s*$/);
                    if (matches) {
                        Rei.putFactoid(matches[1], matches[2]);
                    }
                }
                if (arrayOfLines.length > 0) {
                    return { confidence:1, message:"Learned "+arrayOfLines.length+ " factoids."};
                } else {
                    console.error("No factoids extracted!");
                }
            };

            console.log("factoid#learnFromURL: fetching "+url);
            jQuery.get( url, undefined, handleResult);
        }

    };
});
