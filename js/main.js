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
                                CALCULATOR
  ---------------------------*/
$('a.insert-more').on('click', function(event) {
  event.preventDefault();
  $('.insert-place').removeClass('insert-place').after('<div class="input place insert-place"><input type="text" name="city-end[]" placeholder="Куда:"></div>')
});


/*---------------------------
                              GOOGLE MAP
---------------------------*/
  var map;
  function googleMap_initialize() {
    var lat = $('#map_canvas').data('lat');
    var long = $('#map_canvas').data('long');
    var mapCenterCoord = new google.maps.LatLng(lat+0.001, long+0.006);
    var mapMarkerCoord = new google.maps.LatLng(lat, long);
    if ( $(window).width() < 768 ) {
      mapCenterCoord = new google.maps.LatLng(lat, long);
      mapMarkerCoord = new google.maps.LatLng(lat, long);
    }
    $(window).resize(function(event) {
      if ( $(window).width() < 768 ) {
        mapCenterCoord = new google.maps.LatLng(lat, long);
        mapMarkerCoord = new google.maps.LatLng(lat, long);
      } else {
        mapCenterCoord = new google.maps.LatLng(lat+0.001, long+0.006);
        mapMarkerCoord = new google.maps.LatLng(lat, long);
      }
    });

      var mapOptions = {
      center: mapCenterCoord,
      zoom: 15,
      //draggable: false,
      disableDefaultUI: true,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    var markerImage = new google.maps.MarkerImage('images/location.png');
    var marker = new google.maps.Marker({
      icon: markerImage,
      position: mapMarkerCoord, 
      map: map,
      title:"Megaexpress"
    });
    
    $(window).resize(function (){
      map.setCenter(mapCenterCoord);
    });
  }

  googleMap_initialize(); 


}); // end




