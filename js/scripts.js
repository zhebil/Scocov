jQuery(function($) {
    $("#phone").mask("+38(999) 999-9999");
});

$(".slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    adaptiveHeigth: true,
    dots: true,
    speed: 1000,

});


$(".client-slider").slick({
    slidesToShow: 5,
    autoplay: true,
    speed: 1000,
    slidesToScroll: 3,
    responsive: [{
        breakpoint: 900,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 2
        }
    }, {
        breakpoint: 600,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
});


$(function() {
    var $menu = $("#menu");

    $(window).scroll(function() {
        if ($(this).scrollTop() > 140 && $menu.hasClass("non-fixed")) {
            $menu.fadeOut('fast', function() {
                $(this).removeClass("non-fixed")
                    .addClass("fixed-menu")
                    .fadeIn('fast');
                $(".top").addClass("clear")
            });
        } else if ($(this).scrollTop() <= 140 && $menu.hasClass("fixed-menu")) {
            $menu.fadeOut('fast', function() {
                $(".top").removeClass("clear")
                $(this).removeClass("fixed-menu")
                    .addClass("non-fixed")
                    .fadeIn('fast');
            });
        }
    });


    $('.burger,.menu-item').click(function(event) {
        $('body').toggleClass('hidden')
        $('.burger,.menu-none').toggleClass('active');
    });

    $('*[class*="menu"] li').not($('.main-menu li:first-child')).on('click', function(event) {
        event.preventDefault();
        var selector = $(this).children().attr('href');
        var $he = $('.main-menu').css('height')
        var h = $(selector);
        $('html, body').animate({
            scrollTop: h.offset().top - parseInt($he, 10)
        }, 100, 'swing');

    });
})