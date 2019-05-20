var map, markers, poly;
var directionsService, directionsDisplay;

var coords = [
  { lat: 41.879, lng: -87.624},
  { lat: 41.4, lng: -88.624 },
  { lat: 41.4, lng: -87.624 },
  { lat: 41.55, lng: -87.75 },
  { lat: 41.23, lng: -86.7 }
];

function createMap () {
  var options = {
    center: { lat: 41.55, lng: -87.75 },
    mapTypeControl: false,
    rotateControl: false,
    zoom: 9
  };

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer({ 
    preserveViewport: true
  });

  map = new google.maps.Map(document.getElementById('map'), options);

  // Create the DIV to hold the control and call the CenterControl()
  // constructor passing in this DIV.
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

  directionsDisplay.setMap(map);

  poly = new google.maps.Polyline({
    strokeOpacity: 0
  });
  poly.setMap(map);

  markers = [];

  markers = coords.map(function (c) {
    return new google.maps.Marker({
      position: c,
      map: map
    });
  });

  markers.forEach(function (m) {
    m.addListener('click', addToList);
  });
}

function CenterControl(controlDiv) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginTop = '8px';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to undo last stop.';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Undo Last Stop';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    var newPath = poly.getPath();
    newPath.pop();
    poly.setPath(newPath);
    updateDirections(poly.getPath());
  });
}

function addToList (event) {
  var path = poly.getPath();
  path.push(event.latLng);

  updateDirections(path);
}

function updateDirections (path) {
  if (path.getLength() <= 1)
    return;

  var waypoints = [];

  path.forEach(function (e, i) {
    if (i !== 0 && i !== path.getLength() - 1) {
      waypoints.push({
        location: path.getAt(i),
        stopover: true
      });
    }
  });

  directionsService.route({
    origin: path.getAt(0),
    destination: path.getAt(path.getLength() - 1),
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