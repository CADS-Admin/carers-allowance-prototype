// Prototype javascript

// This code is not intended for the live service
// The functionality is creates should be recreated using producton-ready code

$(document).ready(function(){

	// ------------------------------------------------------------------
	// GLOBAL VARIABLES
	var totalQuestions = 24;	
	var answered = JSON.parse(localStorage.getItem('answered'));
	var skipped = JSON.parse(localStorage.getItem('skipped'));



	// ------------------------------------------------------------------
	// INTERACTIVE FORM ELEMENTS

	// Initialise toggler
	GOVUK.toggle.init();

	// Apply Select 2 to country selectors
	$(".js-country").select2();



	// ------------------------------------------------------------------
	// STORING AND RETREIVING FORM VALUES

	// Apply Sisyphus to all forms. 
	// Sisyphus uses local storage to store form field values.

	$("form").sisyphus();

	// Set the text node of element with a 'data-from' attribute to a value 
	// in local storage. The key is specified in the attribute

	$('[data-from]').text(function(){
		var id = $(this).data('from');
		return localStorage.getItem('formdata' + id);
	});


	// ------------------------------------------------------------------
	// STORING SKIPPED AND ANSERED QUESTIONS

	// Create empty 'skipped' and 'answered' arrays if they don't exist.
	if (skipped == null) { localStorage.setItem('skipped', JSON.stringify([])); };
	if (skipped == null) { localStorage.setItem('answered', JSON.stringify([])); };

	// If a question is skipped, add the question number to the 'skipped' 
	// array in local storage.
	$('[data-skip]').click(function(){
		skipped.push($(this).data('skip'));
		localStorage.setItem('skipped', JSON.stringify(skipped));
	});

	// If a question is answered, add the question number to the 'answered' 
	// array in local storage.
	$('[data-answer]').click(function(){
		answered.push($(this).data('answer'));
		localStorage.setItem('answered', JSON.stringify(answered));
	});



	// ------------------------------------------------------------------
	// HIGHLIGHTING SKIPPED QUESTIONS

	// Iterate over questions on the 'check answers' page and highlight 
	// the ones that have been skipped.

	$('.review-answers tr').each(function(){
		var question = $(this).find('.question').text();

		console.log(question + ': ' + skipped);
		console.log(localStorage.getItem('skipped').indexOf(question));

		if (localStorage.getItem('answered').indexOf(question) == -1){
			if (localStorage.getItem('skipped').indexOf(question) > -1){
				$(this).find('.answer').addClass('skipped').text('You skipped this question');
			} else {
				$(this).remove();
			}
		}

	});


	// ------------------------------------------------------------------
	// SHOWING TOTAL SKIPPED AND ANSERED QUESTIONS

	$('.question-status').html(function(){

		// Plural or singular?
		var answeredPlural = (answered.length == 1) ? "" : "s";
		var skippedPlural = (skipped.length == 1) ? "" : "s";

		// Format depends on the page...

		if ($(this).attr('id') == 'v1'){
			// On the 'check answers' page
			var skippedMessage = '.';
			if (skipped.length > 0) {
				skippedMessage = ', ' + skipped.length + ' skipped.'
				$(this).prepend('<p class="skipped">Answer any skipped questions before submitting your application.</p>')
			}
			$(this).prepend('<p>' + answered.length + ' question'+answeredPlural+' answered' + skippedMessage + '</p>');
		} else {
			// On question pages
			if (skipped.length > 0) {
				$(this).prepend('<li>' + skipped.length + ' question'+skippedPlural+' skipped</li>');
			}
			$(this).prepend('<li>' + answered.length + ' question'+answeredPlural+' answered</li>');
		}
	});


	// ------------------------------------------------------------------
	// DON'T LET USER SUBMIT APPLICATION UNTIL ALL QUESTIONS ARE ANSWERED

	if ($('.submit-application') && skipped.length > 0){
		$('.submit-application').remove();
	}


	// ------------------------------------------------------------------
	// SET TOTAL PERCENTAGE COMPLETE

	$('.percentage-complete').text(function(){
		return (answered.length * 100 / totalQuestions).toFixed();
	});



	// ------------------------------------------------------------------
	// CANCEL APPLICATION

	// Delete all values from local storage
	$(".cancel-application").click(function( event ) {
		localStorage.clear();
		localStorage.setItem('skipped', JSON.stringify([]));
		localStorage.setItem('answered', JSON.stringify([]));
	});

});