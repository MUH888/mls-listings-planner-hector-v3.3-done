function populateMap (listings) {

  listings.forEach(function (l) {
    var m = new google.maps.Marker({
      map: map,
      title: l.taxAddress,
      position: l.latLng,
      icon: icons[l.listingStatus]//data.listingStatusStyles[l.listingStatus].icon
    });

    m.addListener('click', function () {
      stopArray.push({
        mlsId: l.mlsId,
        latLng: l.latLng,
        letter: letters[stopArray.length]
      });
      updateDirections();
    });

    // m.addListener('mouseover', function () {
    //   infoWindow.setPosition(l.latLng);
    //   infoWindow.setContent(l.mlsId);
    //   infoWindow.open(map);
    // })

    markers.push(m);

    bounds.extend(l.latLng);
  });

  console.log({
    listingCount: listings.length,
    markerCount: markers.length
  });

  map.fitBounds(bounds);
}