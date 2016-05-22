  /*---------------------------
                                CALCULATOR
  ---------------------------*/
  var directionsService = new google.maps.DirectionsService();

  function calcRoute() {
    var start = $('input[name="city-start"]').val();
    var end = $('input[name="city-end"]').val();
    var way = [];
    $('input[name="city-waypoints"]').each(function(index, el) {
      if ($(this).val()!='') {
        way.push({location: $(this).val(), stopover: true});  
      }
    });

    var request = {
      origin:start,
      destination:end,
      optimizeWaypoints: true,
      waypoints: way,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        var dist = 0;
        for (var i = 0; i < result.routes[0].legs.length; i++) {
          dist += result.routes[0].legs[i].distance.value;
        }
        dist = dist/1000;
        $('input[name="distance"]').val(dist);
      }
    });
  }
  calcRoute();


  var options = {
    types: ['address'],
    componentRestrictions: {country: 'ru'}
  };
  $('.city').each(function(index, el) {
    autocomplete = new google.maps.places.Autocomplete($(this)[0], options);
    autocomplete.addListener('place_changed', calcRoute);
  });


  $('a.insert-more').on('click', function(event) {
    event.preventDefault();

    $('.city').each(function(index, el) {
      google.maps.event.clearInstanceListeners($(this)[0]);
    });
    
    $('.insert-place')
      .removeClass('insert-place')
      .after('<div class="input place insert-place"><input type="text" name="city-waypoints" placeholder="Промежуточный адрес:" class="city" onchange="calcRoute();"></div>');
    
    $('.city').each(function(index, el) {
      autocomplete = new google.maps.places.Autocomplete($(this)[0], options);
      autocomplete.addListener('place_changed', calcRoute);
    });
    
  });
