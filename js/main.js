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

}); // end




