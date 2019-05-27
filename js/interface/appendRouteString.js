function appendRouteString () {

  $('#resultString').html('');

  if (stopArray.length === 0)
    return;

  var string = '';
  stopArray.forEach(function (s, i) {
    if (i === stopArray.length - 1)
      string += s.mlsId;
    else
      string += s.mlsId + ', ';
  });

  $('#buttonCopy').attr('data-clipboard-text', string);
  $('#resultString').text(string);
}