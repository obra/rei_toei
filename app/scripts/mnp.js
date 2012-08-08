
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
 
tags = {
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

max_noun_regex = "\
    # optional number, gerund - adjective -participle   \
    (?:$NUM)?(?:$GER|$ADJ|$PART)*                       \
    # Followed by one or more nouns                     \
    (?:$NN)+                                            \
        (?:                                             \
        # Optional preposition, determinant, cardinal   \
        (?:$PREP)*(?:$DET)?(?:$NUM)?                    \
        # Optional gerund or adjective or participle    \
        (?:$GER|$ADJ|$PART)*                            \
        # one or more nouns                             \
        (?:$NN)+                                        \
    )*                                                  \
";

max_noun_regex = max_noun_regex.replace(/\$([A-Z]+)/g,
                    function(_, arg) { return "\\d+:" + tags[arg] } );
max_noun_regex = max_noun_regex.replace(/\s+(?:#.*?\n)/g, " ");
max_noun_regex = new RegExp(max_noun_regex, "g");

function get_noun_phrases(tokens) {
    structure = [];
    jQuery.each(tokens, function (i, pair) {
        // pair = [token, pos]
        structure.push(i + ":" + pair[1]);
    });
    structure = structure.join(" ");
    matches = structure.match(max_noun_regex);
    mnps = [];
    jQuery.each(matches, function(i, match) {
        mnp = [];
        jQuery.each(match, function(j, pos) {
            pos = pos.split(":");
            mnp.push(tokens[pos[0]]);
        });
        mnps.push(mnp);
    });
    return mnps;
};

var input = process.argv[2];





requirejs(["./pos"], function (Pos) {
    
var lex = new Pos.Lexer().lex(input);
var tokens = new Pos.Tagger().tag(lex);

console.log(tokens);
});

