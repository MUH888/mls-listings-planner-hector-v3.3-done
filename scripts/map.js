var map;
var markers;

function createMap () {
  var options = {
    center: { lat: 25.763, lng: -80.193 },
    zoom: 11
  };

  map = new google.maps.Map(document.getElementById('map'), options);
  markers = [];
}

function addMarkersToMap (status, show) {

  //var bounds = new google.maps.LatLngBounds();
  //var service = new google.maps.places.PlacesService(map);

  if (!locationCache[status]) {

    for (var i = 0; i < listingsByStatus[status].length; i++) {
      var l = listingsByStatus[status][i];
      var address = l['Tax Address'] + ', ' + l['Tax City'] + ', ' + l['Tax State'];

      var request = new XMLHttpRequest();
      request.open('GET', 
        'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?'
          + 'key=AIzaSyDaSWoEDVlWC6ellCADKvjz4poo9boa-oA'
          + '&inputtype=textquery'
          + '&fields=geometry'
          + '&input=' + address, 
        false);
      request.send({ hea});
      var res = JSON.parse(request.responseText);

      if (res.candidates.length > 0)
        listingsByStatus[status][i]['Geometry'] = res.candidates[0].geometry;
    }

    locationCache[status] = true;
  }

  for (var i = 0; i < listingsByStatus[status].length; i++) {
    markers.push(new google.maps.Marker({
      map: map,
      title: l['Tax Address'],
      position: listingsByStatus[status][i]['Geometry'].location
    }));
  }
}
  // for (var i = 0; i < listingsByStatus[s].length; i++) {
    
  //   var l = listingsByStatus[s][i];

  //   console.log(cacheByStatus[s][i]);

  //   if (cacheByStatus[s][i]) {

  //     markers.push(new google.maps.Marker({
  //       map: map,
  //       title: l['Tax Address'],
  //       position: cacheByStatus[s][i].location
  //     }));
      
  //   } else {
  //     var request = {
  //       query: l['Tax Address'] + ', ' + l['Tax City'] + ', ' + l['Tax State'],
  //       fields: ['name', 'geometry'],
  //     };

  //     service.findPlaceFromQuery(request, function (results, s) {
  //       if (s === google.maps.places.PlacesServiceStatus.OK) {
  //         console.log('Made API call.');

  //         if (results.length > 0) {

  //           cacheByStatus[status][i] = results[0].geometry;

  //           markers.push(new google.maps.Marker({
  //             map: map,
  //             title: l['Tax Address'],
  //             position: results[0].geometry.location
  //           }));

  //         }
  //       }
  //     });
  //   }
  // }

  // listingsByStatus[s].forEach(function (l) {
  //   if (l['Geometry']) {
  //     if (l['Geometry'].viewport)
  //      bounds.union(l['Geometry'].viewport);
  //     // else
  //     //   bounds.extend(l['Geometry'].location);


  //   }
  // });

  //map.fitBounds(bounds);

