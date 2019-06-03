function populateMap (listings) {

  listings.forEach(function (l) {
    var m = new google.maps.Marker({
      map: map,
      title: l.taxAddress,
      position: l.latLng,
      icon: icons[l.listingStatus]//data.listingStatusStyles[l.listingStatus].icon
    });

    m.addListener('click', function () {
      //infoWindow.close();
      stopArray.push({
        // letter: letters[stopArray.length],
        mlsId: l.mlsId,
        listingStatus: l.listingStatus,
        latLng: l.latLng
      });
      updateDirections();
    });

    // m.addListener('mouseover', function () {
    //   infoWindow.setPosition(l.latLng);
    //   infoWindow.setContent(l.mlsId);
    //   infoWindow.open(map);
    // });

    // m.addListener('mouseout', function () {
    //   infoWindow.close();
    // });

    markers.push(m);

    bounds.extend(l.latLng);
  });

  // console.log({
  //   listingCount: listings.length,
  //   markerCount: markers.length
  // });

  map.fitBounds(bounds);
}