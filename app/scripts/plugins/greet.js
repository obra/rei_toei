
define(['plugins/greet'], function () {
        return {
                    name: 'greet',
                    reply:


    function(args) {
        if (result = args.rawInput.match(/^(My name is|I'm called|Call me) (.*)$/i)) {
           args.persistentStorage["global.userName"] = result[2];
           return [1, "Hi "+result[2]];
        } else if (result = args.rawInput.match(/^(What's my name|What am I called|Who am I)/)) {
            return[1, "You're "+args.persistentStorage["global.userName"]];        

        } else {
            return [0, "Sorry, no name there"];
        }
        }
}});
