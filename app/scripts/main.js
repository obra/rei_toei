var PLUGINS = ['./plugins/greet', './plugins/weather'];
var Rei;
requirejs(['./rei'], function(rei) {
    Rei = rei
    Rei.initializePlugins(PLUGINS);

});

function handleQuery() {
    var cmd = jQuery("#q").val();
    $("#conversation").append('<div class="user">'+cmd+'</div>');
    var response = Rei.handleQuery(cmd);
    $("#conversation").append('<div class="rei">'+JSON.stringify(response)+'</div>');
        
} 

jQuery("#q").on("blur", function() {
    handleQuery();

});
