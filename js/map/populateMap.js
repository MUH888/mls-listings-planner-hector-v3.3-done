function populateMap(listings) {
  listings.forEach(function (l) {
    const m = new google.maps.Marker({
      map: map,
      title: l.taxAddress,
      position: l.latLng,
      icon: icons[l.listingStatus]
    });

    m.addListener('click', function () {
      // Check if the marker is already in the stopArray
      const exists = stopArray.getArray().some(function (stop) {
        return stop.mlsId === l.mlsId;
      });

      if (!exists) {
        stopArray.push({
          mlsId: l.mlsId,
          listingStatus: l.listingStatus,
          listing: l,
          latLng: l.latLng
        });
        updateDirections();
        setMapFile();
      } else {
        alert("This marker is already selected.");
      }
    });

    m.addListener('mouseover', function () {
      setListingInfo(l);
    });

    markers.push(m);
    bounds.extend(l.latLng);
  });
  map.fitBounds(bounds);
}
