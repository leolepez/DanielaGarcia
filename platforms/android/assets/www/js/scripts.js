$(window).load(function() {
    $(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({ default_offset_pct: 0.5 });

});

$(document).ready(function() {
    $(".launchPopupFullscreen").click(function() {
        $('#popupFullscreen').fadeIn();
    });

    $(".closePopupFullscreen").click(function() {
        $('#popupFullscreen').fadeOut();
    });
});


$(document).bind('mobileinit',function(){
    $.mobile.changePage.defaults.changeHash = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});

function salir(){
    navigator.app.exitApp(); 
}

function checkConnection() {
   if(navigator.connection.type == Connection.NONE) {        
    alert("No hay conneción.");
    }
}

document.addEventListener("deviceready", function() {
    checkConnection();
}, false);