var PLUGINS = ['./plugins/greet', './plugins/weather'];
var Rei;
requirejs(['./rei'], function(rei) {
    Rei = rei
    Rei.initializePlugins(PLUGINS);

});

function handleQuery() {
    var cmd = jQuery("#q").val();
    if (cmd === '')
        return;
    $("#conversation").append('<div class="user"><span class="yourname">You:</span> <span class="msg">'+cmd+'</span></div>');
    var response = Rei.handleQuery(cmd);
    reiSay(JSON.stringify(response));
} 

function reiSay(string) {
    $("#conversation").append('<div class="rei"><span class="reiname">Rei:</span> <span class="msg">'+string+'<span></div>');

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
    reiSay("Hi! I'm Rei Toei. What's your name?");

});
