// =========================================================================  go_order
$(function() {
    //фкнкция вызова формы обратной связи
    $('.order-button').click(function() {
        //появление окна обратной связи
        $('body').addClass("hidden");
        $('.form').fadeIn();
        //добавляем к окну иконку закрытия
        $('.form').append('<a class="form-close"></a>');

        //расчитываем высоту и ширину всплывающего окна что бы вывести окно прямо по центру экрана
        q_width = $('.form').outerWidth() / -2;
        q_height = $('.form').outerHeight() / -2;
        $('.form').css({
            'margin-left': q_width,
            'margin-top': q_height
        });
        //выводим затемение страницы и делаем полупрозрачным
        $('body').append('<div id="fade"></div>');
        $('#fade').css({ 'filter': 'alpha(opacity=40)' }).fadeIn();

        return false;
    });

    //функция закрытия окна
    $('.form-close, #fade').live('click', function() {
        $('#fade').fadeOut(function() {
            $('body').removeClass("hidden");
            $('#fade').remove();
            $('.form-close').remove();
            $('.form').fadeOut();

        });
    });

});