
define(['plugins/greet'], function () {
        return {
                    name: 'greet',
                    reply:


    function(args) {
        if (result = args.rawInput.match(/^(My name is|I'm called|Call me) (.*)$/i)) {
           args.persistentStorage["global.userName"] = result[2];
           return {confidence: 1,  message: "Hi "+result[2]};
        } else if (result = args.rawInput.match(/^(What's my name|What am I called|Who am I)/)) {
            return{confidence: 1, message:"You're "+args.persistentStorage["global.userName"]};

        } else {
            return { confidence: 0,  message: "Sorry, no name there"};
        }
        }
}});
