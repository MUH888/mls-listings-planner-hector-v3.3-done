function formatAddress(address) {
  // Remove all commas from the address except for the one after the zip code
  return address.replace(/,([^,]*),([^,]*$)/, '$1 $2').replace(/,/g, '').replace(/\s\s+/g, ' ');
}

function setRouteString() {
  $('#routeString').html('');

  if (stopArray.getLength() === 0)
    return;

  var string = '';
  stopArray.forEach(function (s, i) {
    var formattedAddress = formatAddress(s.listing.taxAddress);
    if (i === stopArray.length - 1)
      string += formattedAddress; // Use formattedAddress without a trailing comma
    else
      string += formattedAddress + ', '; // Use formattedAddress with a trailing comma
  });

  var directions = '';
  stopArray.forEach(function (s, i) {
    var formattedAddress = formatAddress(s.listing.taxAddress);
    if (i === stopArray.length - 1) {
      directions += letters[i]
        + ': '
        + encodeURI('https://www.google.com/maps/dir/?api=1&destination=' + formattedAddress); // Use formattedAddress
    } else {
      directions += letters[i]
        + ': '
        + encodeURI('https://www.google.com/maps/dir/?api=1&destination=' + formattedAddress) // Use formattedAddress
        + '\n';
    }
  });

  $('#buttonCopyString').attr('data-clipboard-text', string);
  $('#buttonCopyDirections').attr('data-clipboard-text', directions);
  $('#routeString').text(string);
}
