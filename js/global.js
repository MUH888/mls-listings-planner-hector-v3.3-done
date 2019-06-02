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

var colours = {
  'Cancelled': '#00cc00',
  'Expired': '#00cc00',
  'FSBO': '#ff4d4d',
  'Gated': '#ffd700',
  'Busy': '#3366ff'   
};


// [
//   //#ff9900', 
//   //'#00cc00', 
//   '#3366ff', '#9966ff'
// ];

var icons = {
  'Cancelled': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  'Expired': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  'FSBO': 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  'Gated': 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
  'Busy': 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
};

var letters = [
  'A','B','C','D','E','F','G','H','I','J','K','L','M',
  'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
];

// var icons = [
//   //'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
//   //'ttp://maps.google.com/mapfiles/ms/icons/wht-dot.png',
//   'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
//   'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
//   'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
//   'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
// ];