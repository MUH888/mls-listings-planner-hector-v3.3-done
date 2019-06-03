function populateMap (listings) {

  listings.forEach(function (l) {
    var m = new google.maps.Marker({
      map: map,
      title: l.taxAddress,
      position: l.latLng,
      icon: icons[l.listingStatus]
    });

    m.addListener('click', function () {
      stopArray.push({
        mlsId: l.mlsId,
        listingStatus: l.listingStatus,
        listing: l,
        latLng: l.latLng
      });
      updateDirections();
    });

    m.addListener('mouseover', function () {
      setListingInfo(l);
    });

    markers.push(m);
    bounds.extend(l.latLng);
  });
  map.fitBounds(bounds);
}