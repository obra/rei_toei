
define(['plugins/weather'], function() {
    return {
        name: 'weather',
        reply: function(args) {
            jQuery = args.jQuery;
            var url = 'http://www.google.com/ig/api?weather=San%20Francisco,%20CA';

            jQuery.ajax({
                url: url,
                type: 'get',
                dataType: 'xml',
                async: false,
                success: function(data) {
                    output = data.getElementsByTagName("condition")[0].getAttribute("data");
                }
            });
            return [1, output];
        }
    }
});
