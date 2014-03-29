// Prototype javascript

// This code is not intended for the live service
// The functionality is creates should be recreated using producton-ready code

$(document).ready(function(){

 $(".js-country").select2();

 $("#relationship").select2();

 $("form").sisyphus();

var getFormData = function(id) {
    var prefix = "formdata";
    return localStorage.getItem('' + prefix + id);
};

$('[data-from]').text(function(){
	var id = $(this).data('from');
	return getFormData(id);
});



  $(".cancel-application").click(function( event ) {
	localStorage.clear();
  });

 GOVUK.toggle.init();

  // TOGGLE HELP PANEL

  $(".js-help-toggle").click(function( event ) {
    $('#help-feedback').toggleClass('js-hidden');
    return false;
  });

});