var colours = [
  '#ff4d4d',
  '#ff9900',
  '#00cc00',
  '#3366ff',
  '#9966ff'
];

var markerIcons = [
  'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
  'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
];

function processData (data) {
  var mlsData = {};

  mlsData.statuses = _.uniq(data
    .map(function (l) { return l['Listing Status']; })
    .sort()
  );

  mlsData.colours = {};
  mlsData.listingsByStatus = {};

  mlsData.statuses.forEach(function (s, i) {
    mlsData.colours[s] = {
      colour: colours[i],
      marker: markerIcons[i]
    };

    mlsData.listingsByStatus[s] = data.filter(function (l) {
      return l['Listing Status'] === s;
    });
  });

  return mlsData;
}