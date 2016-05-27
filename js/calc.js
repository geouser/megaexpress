  /*---------------------------
                                CALCULATOR
  ---------------------------*/
  var directionsService = new google.maps.DirectionsService();

  var prices = [
    {
      car: 'Газель 12 куб. 1,5 тонны',
      price: {
        distance: 15,
        hour: 450,
        leafter: 300,
        expedition: 450
      }
    },
    {
      car: 'Газель 18 куб',
      price: {
        distance: 17,
        hour: 500,
        leafter: 300,
        expedition: 500
      }
    },
    {
      car: 'Газель 21 куб.',
      price: {
        distance: 18,
        hour: 550,
        leafter: 300,
        expedition: 550
      }
    },
    {
      car: 'Газон 36 куб. 5 тонн',
      price: {
        distance: 20,
        hour: 650,
        leafter: 300,
        expedition: 650
      }
    },
    {
      car: 'Газон 40 куб.  8 тонн',
      price: {
        distance: 22,
        hour: 750,
        leafter: 300,
        expedition: 750
      }
    },
    {
      car: 'Мерседес 40 куб. 10 тонн',
      price: {
        distance: 24,
        hour: 900,
        leafter: 300,
        expedition: 900
      }
    },
    {
      car: 'Евро фура 82 куб. 20 тонн',
      price: {
        distance: 28,
        hour: 1200,
        leafter: 300,
        expedition: 1200
      }
    }
  ]

  function selectCars(){
    for (var i = 0; i < prices.length; i++) {
      $('select[name="car-type"]').append('<option value="'+i+'">'+prices[i].car+'</option>');
    }
  }
  selectCars();

  function selectPrices(){
    var carIndex = $('select[name="car-type"]').val();

    $('input[name="distance"]').attr('data-price', prices[carIndex].price.distance);
    $('select[name="rent-time"]').attr('data-price', prices[carIndex].price.hour);
    $('select[name="man-count"]').attr('data-price', prices[carIndex].price.leafter);
  }
  selectPrices();

  var dist = 0;
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
    dist = 0;
    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        for (var i = 0; i < result.routes[0].legs.length; i++) {
          dist += result.routes[0].legs[i].distance.value;
        }
        dist = dist/1000;
        $('input[name="distance"]').val(dist);
        calculatePrice();
      }
    });
  }
  calcRoute();


  function calculatePrice(){

    var distance = $('input[name="distance"]').val();
    var distancePrice = $('input[name="distance"]').attr('data-price');

    var rentTime = $('select[name="rent-time"]').val();
    var rentTimePrice = $('select[name="rent-time"]').attr('data-price');

    var manCount = $('select[name="man-count"]').val();
    var manPrice = $('select[name="man-count"]').attr('data-price');

    var result = distance*distancePrice + rentTime*rentTimePrice + manCount*manPrice;

    console.log('distance: '+distance);
    console.log('distancePrice: '+distancePrice);
    console.log('rentTime: '+rentTime);
    console.log('rentTimePrice: '+rentTimePrice);
    console.log('manCount: '+manCount);
    console.log('manPrice: '+manPrice);
    console.log('подать через: '+$('input[name="time"]:checked').val());
    console.log('-------------------------------');

    $('.sum-holder').text(parseInt(result));
  }




  /*Autocomplete addresses*/
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
      .after('<div class="input place insert-place"><input type="text" name="city-waypoints" placeholder="Промежуточный адрес:" class="city"></div>');
    
    $('.city').each(function(index, el) {
      autocomplete = new google.maps.places.Autocomplete($(this)[0], options);
      autocomplete.addListener('place_changed', calcRoute);
    });
  });