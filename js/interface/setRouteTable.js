function setRouteTable () {
  $('#routeTableBody').html(''); 

  if (stopArray.getLength() === 0)
    return;

  stopArray.forEach(function (s, i) {
    var $tr = $('<tr />');

    var $tdLetter = $('<td />')
      .attr('scope', 'col')
      .text(letters[i]);
    var $tdMlsId = $('<td />')
      .attr('scope', 'col')
      .text(s.mlsId)
      .mouseover(function () {
        setListingInfo(stopArray.getAt(i).listing);
      });
    var $tdStatus = $('<td />')
      .attr('scope', 'col')
      .text(s.listingStatus);
    var $tdClose = $('<td />')
      .attr('scope', 'col');
    var $tdCloseButton = $('<button />')
      .attr('type', 'button')
      .attr('class', 'close')
      .attr('value', i)
      .html('<span>&times;</span>')
      .click(function () {
        removeStop($(this).val());
      });

    $tr.append($tdLetter);
    $tr.append($tdMlsId);
    $tr.append($tdStatus);
    $tdClose.append($tdCloseButton);
    $tr.append($tdClose);

    $('#routeTableBody').append($tr);
  });
}

// <tr>
//   <td scope='col'>A</td>
//   <td scope='col'>A1000000</td>
//   <td scope='col'>Expired</td>
//   <td scope='col'>
//     <button type="button" class="close">
//       <span aria-hidden="true">&times;</span>
//     </button>
//   </td>
// </tr>