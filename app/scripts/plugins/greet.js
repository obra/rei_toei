
define(['plugins/greet'], function () {
        return {
                    name: 'greet',
                    reply: function(args) { return [1,'Hi '+args.rawInput+'!']}
        }
});
