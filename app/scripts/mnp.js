var _ = require('underscore');
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

/* compute maximal noun phrases from tagged text
   the relevant parts are from Lingua-EN-Tagger/Tagger.pm */
 
var tags = {
    NUM  : 'CD',
    GER  : 'VBG',
    ADJ  : 'JJ[RS]*',
    PART : 'VBN',
    NN   : 'NN[SP]*',
    NNP  : 'NNP',
    PREP : 'IN',
    DET  : 'DET',
    PAREN: '[LR]RB',
    QUOT : 'PPR',
    SEN  : 'PP'
};

function _compile_regex(tmpl) {
    tmpl = tmpl.replace(/\$([A-Z]+)/g,
            function(_, arg) { return "\\d+:" + tags[arg] + "\\s*" } );
    return new RegExp(tmpl, "g");
}

var max_noun_regex = _compile_regex(
    // optional number, gerund - adjective -participle
    "(?:$NUM)?(?:$GER|$ADJ|$PART)*" +
    // Followed by one or more nouns
    "(?:$NN)+" +
        "(?:" +
        // Optional preposition, determinant, cardinal
        "(?:$PREP)*(?:$DET)?(?:$NUM)?" +
        // Optional gerund or adjective or participle 
        "(?:$GER|$ADJ|$PART)*" + 
        // one or more nouns
        "(?:$NN)+" +
    ")*"
);

var phrase_split_regex = _compile_regex("\\s*(?:$PREP|$DET|$NUM)\\s*");

function extract_structure(tokens) {
    var structure = [];
    _.each(tokens, function (pair, i) {
        // pair = [token, pos]
        structure.push(i + ":" + pair[1]);
    });
    return structure.join(" ");
}

function recreate_tokens(structure, original_tokens) {
    var tokens = [];
    _.each(structure.split(" "), function(pos, j) {
        if (!pos) return;
        pos = pos.split(":");
        tokens.push(original_tokens[pos[0]]);
    });
    return tokens;
}

function maximal_noun_phrases(structure) {
    return structure.match(max_noun_regex);
};

function split_noun_phrases(structure) {
    return structure.split(phrase_split_regex);
}

function get_noun_phrases(tokens, max_length) {
    if (!max_length) max_length = 3;
    var structure = extract_structure(tokens);
    var nps = [];
    var stack = [structure];
    console.log("stack", stack);
    while (stack.length) {
        var mnps = maximal_noun_phrases(stack.pop());
        _.each(mnps, function(mnp, i) {
            console.log("mnp", mnp);
            var len = mnp.split(" ").length;
            if (len <= max_length) {
                nps.push(recreate_tokens(mnp, tokens));
            }
            if (len > 1) {
                stack.push(mnp.split(" ").slice(1).join(" "));
            }
            subphrases = split_noun_phrases(mnp);
            if (subphrases.length > 1) {
                stack.concat(subphrases);
            }
        });
    }
    return nps;
}

var input = process.argv[2];

requirejs(["./pos"], function (Pos) {
    var lex = new Pos.Lexer().lex(input);
    var tokens = new Pos.Tagger().tag(lex);
    console.log(get_noun_phrases(tokens));
});
