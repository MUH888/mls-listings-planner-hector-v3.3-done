var data = {},
    cache = {};
    options = {
      listingStatusFilter: {}
    },
    progress = 0;

var map,
    bounds,
    markers,
    geocoder,
    infoWindow,
    stopArray,
    directionsService,
    directionsDisplay;

var colours = [
  '#ff4d4d', '#ff9900', '#00cc00', '#3366ff', '#9966ff'
];

var letters = [
  'A','B','C','D','E','F','G','H','I','J',
  'K','L','M','N','O','P','Q','R','S','T',
  'U','V','W','X','Y','Z'
];

var icons = [
  'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
  'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
];