$(function () {
  $("a").on("click", function (e) {
    e.preventDefault();
  });

  var burgerWrapper = $(".burger-wrapper");
  var menuNone = $(".menu-none");
  var menuWrapper = $(".menu-wrapper");
  var func = function () {
    menuNone.css("display", "none");
    menuWrapper.css("display", "none");
  };

  burgerWrapper.on("click", function () {
    var $display = menuNone.css("display");

    if ($display == "none") {
      $(this).children().addClass("active");
      $("body").css("overflow", "hidden");
      menuNone.css("display", "flex");
      menuWrapper
        .css({
          display: "block",
          overflow: "scroll",
        })
        .animate(
          {
            height: "100vh",
          },
          400,
          "linear"
        );
    } else {
      $(this).children().removeClass("active");
      $("body").css("overflow", "auto");
      menuWrapper.animate(
        {
          height: "0",
        },
        400,
        "linear"
      );
      setTimeout(func, 400);
    }
  });
  var menuListItem = $(".menu-list-item a");

  var menuListItemRight = $(".menu-list-item-right");
  var menuField = $(".menu-field");
  menuListItem.on("mouseenter", function () {
    $(this).parent().next().children().stop(true, true);

    menuListItemRight.children().slideUp(400);

    if ($(window).width() >= 768) {
      menuField.fadeOut(400);
    }
    $(this).parent().next().css("display", "flex");

    $(this).parent().next().children().slideDown(400);
  });
  menuNone.on("mouseleave", function () {
    menuListItemRight.children().slideUp(400);
    if ($(window).width() >= 768) {
      menuField.stop(true, true).fadeIn(400);
    }
  });

  menuListItemRight.on("mouseleave", function () {
    $(this).children().stop(true, true).slideUp(400);
    if ($(window).width() >= 768) {
      menuField.fadeIn(400);
    }
  });

  const adapt = function () {
    if ($(window).width() <= 768) {
      $(".footer-top ul").css("display", "none");
      $(".footer-top").addClass("active");
      menuField.css("display", "none");
    } else {
      $(".footer-top ul").css("display", "block");
      menuField.css("display", "block");
    }
    if ($(window).width() <= 665) {
      $(".personal-office img").addClass("active");
      $(".personal-office button").css("display", "none");
     $('.office-wrapper').css('display', 'none')
      $(".logo img").attr("src", "images/favicon.png");
      $(".search input").attr("placeholder", "Поиск");
    } else {
      
      $(".office-wrapper").css("display", "flex");
      $(".personal-office button").css("display", "block");
      $(".logo img").attr("src", "images/sezam-logo.png");
      $(".search input").attr("placeholder", "Найти товар");
    }
  };
  $(window).resize(adapt);

  adapt();
  $(".footer-top.active h4").on("click", function () {
    $(this).toggleClass("active").next().toggle(400);
  });

  $(".personal-office img.active").on("click", function () {
   $('.office-wrapper button').css('display', 'block')
    $(".office-wrapper").slideToggle(400);
  });
});
