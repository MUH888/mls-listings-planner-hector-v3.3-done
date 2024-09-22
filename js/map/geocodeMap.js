function geocodeMap(listings, callback) {
  const promises = [];

  for (let i = 0; i < listings.length; i++) {
    promises.push(geocodePromise(listings[i], (1 / listings.length) * 100, i + 1));
  }

  Promise.all(promises).then(function (listings) {
    callback(listings.filter(function (l) {
      return l.latLng ? true : false;
    }));
  }).catch(function (err) {
    console.log(err);
  });
}

function geocodePromise(listing, progress, timeout) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      geocoder.geocode({ 'address': listing.taxAddress }, function (results, status) {
        console.log(status);
        let l = listing;
        setProgress(progress);
        if (status === google.maps.GeocoderStatus.OK) {
          l.latLng = results.length > 0 ? results[0].geometry.location : null;
          return resolve(l);
        } else {
          l.latLng = null;
          return resolve(l);
        }
      });
    }, timeout * 1000);
  });
}
