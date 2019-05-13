var map;
var markers;
var geocoder;

function createMap () {
  var options = {
    center: { lat: 25.763, lng: -80.193 },
    mapTypeControl: false,
    rotateControl: false,
    zoom: 11
  };

  map = new google.maps.Map(document.getElementById('map'), options);
  markers = [];
  geocoder = new google.maps.Geocoder();
}

function addMarkers (status) {
  var promises = [];

  for (var i = 0; i < data.listingsByStatus[status].length; i++) {
    var l = data.listingsByStatus[status][i];  
    promises.push(geocodePromise(
      i + 1,
      l['MLS ID'],
      l['Tax Address'] + ', ' + l['Tax City'] + ', ' + l['Tax State']
    ));
  }

  Promise.all(promises).then(function (r) {
    console.log(r);
  }).catch(function (err) { 
    console.log(err);
  });
}

function geocodePromise (timing, mlsId, address) {
  return new Promise (function (resolve, reject) {
    setTimeout(function () {
      geocoder.geocode({ 'address': address }, function (results, status) {
        console.log(status);
        if (status == google.maps.GeocoderStatus.OK) {
          if (results.length > 0)
            return resolve({ [mlsId]: results[0].geometry.location });
          else 
            return resolve({ [mlsId]: null });
        } else {
          return reject();
        }
      });
    }, timing * 1000);
  });
}

  //var bounds = new google.maps.LatLngBounds();
  //var service = new google.maps.places.PlacesService(map);

  // listingsByStatus[s].forEach(function (l) {
  //   if (l['Geometry']) {
  //     if (l['Geometry'].viewport)
  //      bounds.union(l['Geometry'].viewport);
  //     // else
  //     //   bounds.extend(l['Geometry'].location);


  //   }
  // });

  //map.fitBounds(bounds);
