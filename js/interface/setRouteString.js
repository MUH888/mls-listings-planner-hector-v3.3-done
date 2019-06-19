function setRouteString () {
  $('#routeString').html('');

  if (stopArray.getLength() === 0)
    return;

  var string = '';
  stopArray.forEach(function (s, i) {
    if (i === stopArray.length - 1)
      string += s.mlsId;
    else
      string += s.mlsId + ', ';
  });

  var directions = '';
  stopArray.forEach(function (s, i) {
    if (i === stopArray.length - 1) {
      directions += letters[i] 
        + ': ' 
        + encodeURI('https://www.google.com/maps/dir/?api=1&destination=' + s.listing.taxAddress);
    } else {
      directions += letters[i] 
        + ': ' 
        + encodeURI('https://www.google.com/maps/dir/?api=1&destination=' + s.listing.taxAddress)
        + '\n';
    }
  });

  $('#buttonCopyString').attr('data-clipboard-text', string);
  $('#buttonCopyDirections').attr('data-clipboard-text', directions);
  $('#routeString').text(string);
}