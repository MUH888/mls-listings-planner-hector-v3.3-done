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
  directionsDisplay = new google.maps.DirectionsRenderer;

  map = new google.maps.Map(document.getElementById('map'), options);

  directionsDisplay.setMap(map);

  poly = new google.maps.Polyline({
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
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

function addToList (event) {
  var path = poly.getPath();

  console.log({ lat: event.latLng.lat, lng: event.latLng.lng });

  path.push(event.latLng);

  console.log(path);


  var waypts = [];


  // directionsService.route({
  //   origin: document.getElementById('start').value,
  //   destination: document.getElementById('end').value,
  //   waypoints: waypts,
  //   optimizeWaypoints: true,
  //   travelMode: 'DRIVING'
  // }, function(response, status) {
  //   if (status === 'OK') {
  //     directionsDisplay.setDirections(response);
  //     // var route = response.routes[0];
  //     // var summaryPanel = document.getElementById('directions-panel');
  //     // summaryPanel.innerHTML = '';
  //     // // For each route, display summary information.
  //     // for (var i = 0; i < route.legs.length; i++) {
  //     //   var routeSegment = i + 1;
  //     //   summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
  //     //       '</b><br>';
  //     //   summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
  //     //   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
  //     //   summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
  //     // }
  //   } else {
  //     window.alert('Directions request failed due to ' + status);
  //   }
  // });
  

}

$(function () {
  createMap();
});