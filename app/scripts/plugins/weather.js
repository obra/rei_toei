
define(['plugins/weather'], function () {
        return {
                    name: 'weather',
                    reply: function(args) { 
                        return [1, "cloudy"];
                    jQuery = args.jQuery; 
                    var remote_url = 'http://www.google.com/ig/api?weather=San%20Francisco,%20CA';
                    var remote = jQuery.ajax({
                               type: "GET",
                               url: remote_url,
                               async: false
                       }).responseText;
                    return remote;
                        
        }
}});
