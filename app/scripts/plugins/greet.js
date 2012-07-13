
define(['plugins/greet'], function () {
        return {
                    name: 'greet',
                    reply: function(input) { return [1,'Hi '+input+'!']}
        }
});
