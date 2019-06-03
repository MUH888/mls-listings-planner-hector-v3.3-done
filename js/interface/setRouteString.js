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

  $('#buttonCopyString').attr('data-clipboard-text', string);
  $('#routeString').text(string);
}