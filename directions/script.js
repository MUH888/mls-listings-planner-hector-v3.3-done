var map, 
    markers,
    stopArray,
    directionsService, 
    directionsDisplay;

var coords = [
  { lat: 41.879, lng: -87.624},
  { lat: 41.4, lng: -88.624 },
  { lat: 41.4, lng: -87.624 },
  { lat: 41.55, lng: -87.75 },
  { lat: 41.23, lng: -86.7 }
];

function createMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 41.55, lng: -87.75 },
    mapTypeControl: false,
    rotateControl: false,
    zoom: 9
  });

  stopArray = new google.maps.MVCArray();
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer({ 
    preserveViewport: true
  });

  var customControlDiv = document.createElement('div');
  var customControl = new CustomControls(customControlDiv);

  customControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(customControlDiv);

  markers = [];
  markers = coords.map(function (c) {
    return new google.maps.Marker({
      position: c,
      map: map
    });
  });

  markers.forEach(function (m) {
    m.addListener('click', function (e) {
      stopArray.push(e.latLng);
      updateDirections();
    });
  });

  directionsDisplay.addListener('directions_changed', function () {
    console.log('Directions changed.');
  });
}

function CustomControls (controlDiv) {
  // Set CSS for the control border.
  var undoButton = document.createElement('div');
  undoButton.style.backgroundColor = '#fff';
  undoButton.style.border = '2px solid #fff';
  undoButton.style.borderRadius = '3px';
  undoButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  undoButton.style.cursor = 'pointer';
  undoButton.style.marginTop = '10px';
  undoButton.style.marginLeft = '10px';
  undoButton.style.marginBottom = '10px';
  undoButton.style.textAlign = 'center';
  undoButton.title = 'Click to undo last stop.';
  controlDiv.appendChild(undoButton);

  // Set CSS for the control interior.
  var undoText = document.createElement('div');
  undoText.style.color = 'rgb(25,25,25)';
  undoText.style.fontFamily = 'Roboto,Arial,sans-serif';
  undoText.style.fontSize = '16px';
  undoText.style.lineHeight = '38px';
  undoText.style.paddingLeft = '5px';
  undoText.style.paddingRight = '5px';
  undoText.innerHTML = 'Undo Last Stop';
  undoButton.appendChild(undoText);

  // Set CSS for the control border.
  var resetButton = document.createElement('div');
  resetButton.style.backgroundColor = '#fff';
  resetButton.style.border = '2px solid #fff';
  resetButton.style.borderRadius = '3px';
  resetButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  resetButton.style.cursor = 'pointer';
  resetButton.style.marginTop = '10px';
  resetButton.style.marginLeft = '10px';
  resetButton.style.marginBottom = '22px';
  resetButton.style.textAlign = 'center';
  resetButton.title = 'Click to reset directions.';
  controlDiv.appendChild(resetButton);

  // Set CSS for the control interior.
  var resetText = document.createElement('div');
  resetText.style.color = 'rgb(25,25,25)';
  resetText.style.fontFamily = 'Roboto,Arial,sans-serif';
  resetText.style.fontSize = '16px';
  resetText.style.lineHeight = '38px';
  resetText.style.paddingLeft = '5px';
  resetText.style.paddingRight = '5px';
  resetText.innerHTML = 'Reset Directions';
  resetButton.appendChild(resetText);

  undoButton.addEventListener('click', function () {
    stopArray.pop();
    if (stopArray.length === 1) // Pop again if only one stop remains.
      stopArray.pop();
    updateDirections();
  });

  resetButton.addEventListener('click', function () {
    stopArray.clear();
    updateDirections();
  });
}

function updateDirections () {

  if (stopArray.getLength() <= 1) {
    directionsDisplay.setMap(null);
    return;
  }
  var waypoints = [];

  stopArray.forEach(function (stop, i) {
    if (i !== 0 && i !== stopArray.getLength() - 1) {
      waypoints.push({
        location: stop,
        stopover: true
      });
    }
  });

  directionsDisplay.setMap(map);

  directionsService.route({
    origin: stopArray.getAt(0),
    destination: stopArray.getAt(stopArray.getLength() - 1),
    waypoints: waypoints,
    optimizeWaypoints: true,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

$(function () {
  createMap();
});