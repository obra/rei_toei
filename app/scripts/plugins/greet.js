
define(['plugins/greet'], function () {
        return {
                    name: 'greet',
                    reply:


    function(args) {
        if (args.rawInput.matches(/^My name is (.*)$/)) {
           args.persistentStorage["global.userName"] = $1;
           return [1, "Hi "+$1];
        } else {
            return [0, "Sorry, no name there"];
        }
    }
        }
});
