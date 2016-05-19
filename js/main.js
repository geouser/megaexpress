// Global parameters
window.params = {
  widthFull: 750,
  maxRowHeight: 0,
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};

jQuery(document).ready(function($) {

  /*---------------------------
                                ADD CLASS ON SCROLL
  ---------------------------*/
  $(function() { 
  var $document = $(document),
      $element = $('.menu-button'),
      $element2 = $('header'),
      className = 'hasScrolled';

    $document.scroll(function() {
      $element.toggleClass(className, $document.scrollTop() >= 1);
      $element2.toggleClass(className, $document.scrollTop() >= 1);
    });
  });

$('li:has(ul)').addClass('hasSub');
$("#tabs, #subtabs").tabs();

if ($(window).width() <= 1000) {
  $('li.hasSub').click(function(event){
    event.preventDefault();
    $(this).children('.sub').slideToggle();
  });
}

$(window).resize(function() {
  if ($(window).width() <= 1000) {
     $('li.hasSub').click(function(){
      event.preventDefault();
      $(this).children('.sub').slideToggle();
    });
  }
});


if ($(window).width() <= 750) {
  var logo = $('.logo');
  $(logo).insertAfter("header");
  $('li.ui-tabs-active').click(function(){
  if($(this).hasClass('dropActive')) {
      $('.ui-tabs-nav').css('height', '60px');
      $('.ui-tabs-nav.subTabsNav').css('display', 'none');
  } else {
    $('.ui-tabs-nav').css('height', 'auto');
    $('.ui-tabs-nav.subTabsNav').css('display', 'block');
  }
  $(this).toggleClass('dropActive');
});

}

$(window).resize(function() {
  if ($(window).width() <= 750) {
    var logo = $('.logo');
    $(logo).insertAfter("header");
    $('li.ui-tabs-active').click(function(){
  if($(this).hasClass('dropActive')) {
      $('.ui-tabs-nav').css('height', '60px');
      $('.ui-tabs-nav.subTabsNav').css('display', 'none');
  } else {
    $('.ui-tabs-nav').css('height', 'auto');
    $('.ui-tabs-nav.subTabsNav').css('display', 'block');
  }
  $(this).toggleClass('dropActive');
});

  }
  if ($(window).width() >= 750) {
    var logo = $('.logo');
    $(logo).insertBefore("nav");
  }
});

  /*---------------------------
                                MENU TOGGLE
  ---------------------------*/
  $('.menu-button').on('click', function(event) {
    event.preventDefault();
    $(this).toggleClass('active');
    $(this).siblings('header').toggleClass('active');
    if ($('header').hasClass('active')) {
        $('body, html').css('overflow', 'hidden');
      } else {
        $('body, html').css('overflow', 'visible');
      }
  });


  $('.offer__slider').slick({
    dots: true,
    arrows: false,
    fade: true
  });

  $('.clients__slider').slick({
    dots: false,
    arrows: true,
    lazyLoad: 'ondemand',
    slidesToShow: 5,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]

  });

  $('.autopark__slider').slick({
    dots: false,
    arrows: true,
    lazyLoad: 'ondemand',
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });



    /*---------------------------
                                  Services
    ---------------------------*/
  $('.sidebar_menu_btn').on('click', function(event) {
    event.preventDefault();
    $('.navigation').slideToggle();
  });
    /*---------------------------
                                  CALCULATOR
    ---------------------------*/
  $('a.insert-more').on('click', function(event) {
    event.preventDefault();
    $('.insert-place').removeClass('insert-place').after('<div class="input place insert-place"><input type="text" name="city-end[]" placeholder="Куда:"></div>')
  });



}); // end




