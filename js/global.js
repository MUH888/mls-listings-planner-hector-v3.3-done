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
    stopArray,
    directionsService,
    directionsDisplay;

var colours = {
  'Cancelled': '#0288d1',
  'Expired': '#0f9d58',
  'FSBO': '#ff4d4d',
  'Gated': '#000000',
  'Busy': '#FFA500'   
};

var icons = {
  'Cancelled': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  'Expired': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  'FSBO': 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  'Gated': './img/black-dot.png',
  'Busy': 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
};

var letters = [
  'A','B','C','D','E','F','G','H','I','J','K','L','M',
  'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
];
