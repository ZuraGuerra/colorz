window.onload = function() {
    var elements = document.querySelectorAll('.photo');
 	
 	for (i=0; i < elements.length; i++) {
 		Intense(elements[i]);
 	}

}

//Navbar



// Mobile Navigation
$('.mobile-toggle').click(function() {
    if ($('.main_h').hasClass('open-nav')) {
        $('.main_h').removeClass('open-nav');
    } else {
        $('.main_h').addClass('open-nav');
    }
});

$('.main_h li a').click(function() {
    if ($('.main_h').hasClass('open-nav')) {
        $('.navigation').removeClass('open-nav');
        $('.main_h').removeClass('open-nav');
    }
});