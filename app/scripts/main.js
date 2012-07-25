var PLUGINS = ['./plugins/greet', './plugins/weather'];
var Rei;
requirejs(['./rei'], function(rei) {
    Rei = rei
    Rei.initializePlugins(PLUGINS);

});

function handleQuery() {
    var cmd = jQuery("#q").val();
    $("#conversation").append('<div class="user"><span class="yourname">You:</span> <span class="msg">'+cmd+'</span></div>');
    var response = Rei.handleQuery(cmd);
    $("#conversation").append('<div class="rei"><span class="reiname">Rei:</span> <span class="msg">'+JSON.stringify(response)+'<span></div>');
        
} 

jQuery("#q").on("blur", function() {
    handleQuery();
    jQuery("#q").val('').focus();

}).on("keyup", function(e) {
      if(e.which == 13) {
           e.preventDefault();
    handleQuery();
    jQuery("#q").val('').focus();
             }
});
