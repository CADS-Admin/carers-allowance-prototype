// Prototype javascript

// This code is not intended for the live service
// The functionality is creates should be recreated using producton-ready code

$(document).ready(function(){

  // CONDITIONAL PAGE FLOW

  $( ".form" ).submit(function( event ) {
    var page = $(this).find('input[name="page"]:checked').val();
    window.location.href = page;
    event.preventDefault();
  });


  // BACK BUTTON

  $(".back").click(function( event ) {
    history.back();
    return false;
  });


  $(".js-help-toggle").click(function( event ) {
    $('#help-feedback').slideToggle(50);
    return false;
  });

});