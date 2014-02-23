$(document).ready(function() {
   // Eligibility / 
   $('#yes').click(function(){
        $('#answerNoMessageWrap').hide('medium');
    });
    $('#no').click(function(){
        $('#answerNoMessageWrap').show('medium');
    });
    $(function(){
      $('.hideShowStart').hide();
      $('.hideShowEnd').hide();
        $('#select-start').click(function(){
            $('.hideShowStart').toggle('slow');
        });
        $('#select-end').click(function(){
            $('.hideShowEnd').toggle('slow');
        });
    });
// view more / view less

	var helper_label = $('.helper-more').text();
    $('.helper-more').click(function(){
       $(this).toggleClass("helper-less");
       $(this).next(".helper-info").slideToggle("medium");
       if($(this).text() === 'Close')
       {
           //$(this).text('Show example');
           $(this).text(helper_label);
       }
       else
       {
       $(this).text('Close');
       }
    }); 

	 
// smooth scroll    
$('a[href^="#"]').bind('click.smoothscroll',function (e) {
    e.preventDefault();
    var target = this.hash,
        $target = $(target);
    $('html, body').animate({
        scrollTop: $(target).offset().top - 40
    }, 750, 'swing', function () {
        window.location.hash = target;
    });
}); 



//$.extend($.datepicker, {
        // _doKeyDown: function(event){
             //  console.log("test");
         //}
    //});
    

//$("#start-date, #end-date").datepicker({
		//dateFormat: 'dd/mm/yy',
		//showButtonPanel: true,
       	//closeText: 'Clear',
             //onClose: function (dateText, inst) {
			//if ($(window.event.srcElement).hasClass('ui-datepicker-close'))
            //{
               // document.getElementById(this.id).value = '';
           // }
       // }
   // });
 
 // auto jump
 
$('#ni-1, #ni-2, #ni-3, #ni-4, #ni-5').autotab_magic();
 
});
