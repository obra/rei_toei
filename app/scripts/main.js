var PLUGINS = ['./plugins/greet', './plugins/weather', './plugins/factoids'];
var Rei;
requirejs(['./rei'], function(rei) {
    Rei = rei;
    Rei.initialize(PLUGINS);
    var name = Rei.getFactoid('my name');
    if (name) { 
        reiSay("Hi "+name + ". How are things?");
    } else{
        reiSay("Hi! I'm Rei Toei. What's your name?");
    }

});

function handleQuery() {
    var cmd = jQuery("#q").val();
    if (cmd === '')
        return;
    $("#conversation").append('<div class="user"><span class="yourname">You:</span> <span class="msg">'+cmd+'</span></div>');
    var response = Rei.handleQuery(cmd);
    var best = response.bestResponse;
    reiSay(best.message);
    if (best.iframeUrl) {
        reiShowIframe(best.iframeUrl);
    }
    console.log(response);
} 

function reiSay(string) {
    $("#conversation").append('<div class="rei"><span class="reiname">Rei:</span> <span class="msg">'+string+'<span></div>');

}

function reiShowIframe(url) {
    $("#conversation").append('<div class="rei"><span class="reiname">Rei:</span> <iframe src="'+url+'"/></div>');

}


jQuery("#submit").on("click", function() {
    handleQuery();
    jQuery("#q").val('').focus();
});

jQuery("#q").on("keyup", function(e) {
      if(e.which == 13) {
           e.preventDefault();
    handleQuery();
    jQuery("#q").val('').focus();
             }
});

jQuery().ready(function() {


});
