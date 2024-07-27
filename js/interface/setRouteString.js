function setRouteString() {
  $('#routeString').html('');

  if (stopArray.getLength() === 0)
    return;

  var string = '';
  stopArray.forEach(function (s, i) {
    if (i === stopArray.length - 1)
      string += s.listing.taxAddress.replace(/,([^,]*,[^,]*$)/, '$1'); // Use taxAddress
    else
      string += s.listing.taxAddress.replace(/,([^,]*,[^,]*$)/, '$1') + ', '; // Use taxAddress
  });

  var directions = '';
  stopArray.forEach(function (s, i) {
    if (i === stopArray.length - 1) {
      directions += letters[i]
        + ': '
        + encodeURI('https://www.google.com/maps/dir/?api=1&destination=' + s.listing.taxAddress.replace(/,([^,]*,[^,]*$)/, '$1')); // Use taxAddress
    } else {
      directions += letters[i]
        + ': '
        + encodeURI('https://www.google.com/maps/dir/?api=1&destination=' + s.listing.taxAddress.replace(/,([^,]*,[^,]*$)/, '$1')) // Use taxAddress
        + '\n';
    }
  });

  $('#buttonCopyString').attr('data-clipboard-text', string);
  $('#buttonCopyDirections').attr('data-clipboard-text', directions);
  $('#routeString').text(string);
}
