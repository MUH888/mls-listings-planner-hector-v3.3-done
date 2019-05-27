function appendRouteTable () {

  $('#resultTableBody').html(''); 

  if (stopArray.length === 0)
    return;

  stopArray.forEach(function (s) {
    var $tr = $('<tr />');
    var $th = $('<th />')
      .attr('scope', 'row')
      .text(s.letter);
    var $tdMlsId = $('<td />')
      .text(s.mlsId);
    var $tdNotes = $('<td />');

    $tr.append($th);
    $tr.append($tdMlsId);
    $tr.append($tdNotes);
    $('#resultTableBody').append($tr);
  });
}

// <tr>
//    <th class='text-center' scope='row'>A</th>
//    <td class='text-center'>A10488148</td>
//    <td></td>
// </tr>