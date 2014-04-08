// Prototype javascript

// This code is not intended for the live service
// The functionality is creates should be recreated using producton-ready code



$(document).ready(function(){

	// ------------------------------------------------------------------
	// GLOBAL VARIABLES
	var totalQuestions = 14;

	if (!localStorage["skipped"] ) {
		localStorage["skipped"] = JSON.stringify([]);
    }

    if (!localStorage["answered"] ) {
		localStorage["answered"] = JSON.stringify([]);
    }

    if (!localStorage["edit"] ) {
		localStorage["edit"] = false;
    } 

	var answered = JSON.parse(localStorage['answered']);
	var skipped = JSON.parse(localStorage['skipped']);
	var edit = JSON.parse(localStorage['edit']);



	// ------------------------------------------------------------------
	// INTERACTIVE FORM ELEMENTS

	// Initialise toggler
	GOVUK.toggle.init();

	// Apply Select 2 to country selectors
	$(".js-country").select2();







  	// Form focus styles
  	if ($('.form').length>0) {

      $(".block-label input").focus(function() {
        $("label[for='" + this.id + "']").addClass("add-focus");
      }).blur(function() {
        $("label").removeClass("add-focus");
      });
      
  	}


  	$('.block-label input[type="radio"]').click(function () {
		var group = $(this).attr('name');
        $('input[name="'+group+'"]:not(:checked)').parent().removeClass("selected");
        $('input[name="'+group+'"]:checked').parent().addClass("selected");
    });
    $('.block-label input[type="radio"]:checked').parent().addClass("selected");







	// ------------------------------------------------------------------
	// 'CONTINUE WITH APPLICATION' LINK

	// The right page is the question after the highest answered 
	// or skipped question

	answeredSkipped = answered.concat(skipped)
	var i = answeredSkipped.indexOf(Math.max.apply(Math, answeredSkipped));
	$('.continue').attr("href", answeredSkipped[i] + 1);


	$('.edit-link').click(function(){
		localStorage['edit'] = true;
	});


	var currentQuestion = $('[data-answer]').data('answer');

	// IF in edit mode AND current question has been previously answered 
	// or skipped, THEN change button text and href


	if (localStorage['edit'] == 'true' && (answeredSkipped.indexOf(currentQuestion) > -1)){

		$('.next.button')
			.text('Update this answer')
			.attr("href", 'check-answers')
			.click(function(){
				localStorage['edit'] = false;
			});
	}


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

	// Pretty print days
	$('.date-day').text(function(i, text){
		return text.replace(/^[0]+/g,"")
	})
	// Pretty print months
	$('.date-month').text(function(i, text){
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		if (! /^[0-9]+$/.test(text)) {
			var newMonth = text;
		} else {
    		var monthNum = parseInt(text);
    		var newMonth = months[monthNum-1];
		}

		return newMonth;
	})


	// ------------------------------------------------------------------
	// STORING SKIPPED AND ANSERED QUESTIONS

	// If a question is skipped, add the question number to the 'skipped' 
	// array in local storage.
	$('[data-skip]').click(function(){
		var question = $(this).data('skip');

		if (skipped.indexOf(question) == -1){
			skipped.push(question);
			localStorage['skipped'] = JSON.stringify(skipped);
		}
	});

	// If a question is answered, add the question number to the 'answered' 
	// array in local storage.
	$('[data-answer]').click(function(){
		var answer = $(this).data('answer');

		if (answered.indexOf(answer) == -1){
			answered.push(answer);
			localStorage['answered'] = JSON.stringify(answered);

			// Remove answered questions from skipped list

			// Skipped questions can become answered, but answered questions
			// STAY answered

			var newSkipped = skipped;
			var index = newSkipped.indexOf(answer);
			if (index > -1) {
			    newSkipped.splice(index, 1);
			    localStorage["skipped"] = JSON.stringify(newSkipped)
			}
		}
	});



	// ------------------------------------------------------------------
	// HIGHLIGHTING SKIPPED QUESTIONS

	// Iterate over questions on the 'check answers' page and highlight 
	// the ones that have been skipped.

	$('.check-answers tr').each(function(){
		var question = parseInt($(this).find('.question').text());

		if (answered.indexOf(question) == -1){
			if (skipped.indexOf(question) > -1){
				$(this).find('.answer').addClass('skipped').text('You skipped this section');
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
				$(this).prepend('<p class="skipped">Answer any skipped sections before submitting your application.</p>')
			}
			$(this).prepend('<p>' + answered.length + ' section'+answeredPlural+' completed' + skippedMessage + '</p>');
		} else {
			// On question pages
			if (skipped.length > 0) {
				$(this).prepend('<li>' + skipped.length + ' section'+skippedPlural+' skipped</li>');
			}
			$(this).prepend('<li>' + answered.length + ' section'+answeredPlural+' completed</li>');
		}
	});


	// ------------------------------------------------------------------
	// SUBMIT APPLICATION

	if (answered.length == totalQuestions){
		$('.submit-application').text('Now submit your application');
		$('.continue.button')
			.text('Continue to consent and declaration')
			.attr("href", 'consent')
			.before('<p>Make sure you check all your information is correct before you continue.</p>');
		$('.question-status p').text('Check your answers before completing your application.');
		$('.continue.back').attr("href", totalQuestions);
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