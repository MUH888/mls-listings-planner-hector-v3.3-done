function geocodeMap (listings, callback) {
  var promises = [];

  for (var i = 0; i < listings.length; i++)
    promises.push(geocodePromise(listings[i], (1 / listings.length) * 100, i + 1));

  // for (var i = 0; i < data.listingsByStatus[status].length; i++) {
  //   var l = data.listingsByStatus[status][i];  
  //   promises.push(geocodePromise(
  //     l['MLS ID'],
  //     l['Tax Address'] + ', ' + l['Tax City'] + ', ' + l['Tax State'],
  //     i + 1
  //   ));
  // }

  Promise.all(promises).then(function (listings) {
    callback(listings);
  }).catch(function (err) { 
    console.log(err);
  });
}

function geocodePromise (listing, progress, timeout) {
  return new Promise (function (resolve, reject) {
    setTimeout(function () {
      geocoder.geocode({ 'address': listing.taxAddress }, function (results, status) {
        console.log(status);
        if (status === google.maps.GeocoderStatus.OK) {
          var l = listing;
          l.latLng = results.length > 0 ? results[0].geometry.location : null;
          setProgress(progress);
          return resolve(l);
        } else {
          return reject();
        }
      });
    }, timeout * 1000);
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