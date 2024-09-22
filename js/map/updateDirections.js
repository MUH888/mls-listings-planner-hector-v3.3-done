function updateDirections() {

  if (stopArray.getLength() <= 1) {
    directionsDisplay.setMap(null);
    return;
  }

  const waypoints = [];

  stopArray.forEach(function (stop, i) {
    if (i !== 0 && i !== stopArray.getLength() - 1) {
      waypoints.push({
        location: stop.latLng,
        stopover: true
      });
    }
  });

  directionsDisplay.setMap(map);

  directionsService.route({
    origin: stopArray.getAt(0).latLng,
    destination: stopArray.getAt(stopArray.getLength() - 1).latLng,
    waypoints: waypoints,
    optimizeWaypoints: true,
    travelMode: 'DRIVING'
  }, function (response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
