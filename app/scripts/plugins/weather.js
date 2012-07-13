
define(['plugins/weather'], function () {
        return {
                    name: 'weather',
                    reply: function(input) { return [1,'Brr. It\'s cold out!']}
        }
});
