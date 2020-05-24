$(document).ready(function() {
    $('.menu-icon').on('click', function() {
        $('nav ul').toggleClass('showing');
        $('nav').addClass('black');
    });
    $('nav ul a').on('click', function() {
        $('nav ul').toggleClass('showing');
        $('nav').removeClass('black');
    });
    $('.logo').on('click', function() {
        if($('nav ul').toggleClass('showing')) {
        $('nav ul').removeClass('showing');
        $('nav').removeClass('black');
        } else {
        
        }

    });

    $(window).on('scroll', function() {
        if($(window).scrollTop()) {
        $('nav').addClass('black');
        } else {
        $('nav').removeClass('black');
        }
    });

});