// Initialize objects and options
let data = {};
let cache = {};
let options = {
  listingStatusFilter: {}
};
let progress = 0;

// Google Maps and related variables
let map;
let bounds;
let markers = [];
let geocoder;
let stopArray;
let directionsService;
let directionsDisplay;

// Define colors for different listing statuses
const colours = {
  'Cancelled': '#0288d1',
  'Expired': '#0f9d58',
  'FSBO': '#ff4d4d',
  'Gated': '#ff9900',
  'Busy': '#FFA500'
};

const icons = {
  'Cancelled': 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  'Expired': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  'FSBO': 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  'Gated': 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
  'Busy': 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
};

// Define letter markers (for the order of listings on the map)
const letters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
