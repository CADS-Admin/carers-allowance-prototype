// Prototype javascript

// This code is not intended for the live service
// The functionality is creates should be recreated using producton-ready code

$(document).ready(function(){

  $("#addressCountry").select2();

  GOVUK.toggle.init();

  // TOGGLE HELP PANEL

  $(".js-help-toggle").click(function( event ) {
    $('#help-feedback').toggleClass('js-hidden');
    return false;
  });

});
