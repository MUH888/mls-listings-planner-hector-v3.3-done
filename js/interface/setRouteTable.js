function setRouteTable () {
  $('#routeTableBody').html(''); 

  if (stopArray.getLength() === 0)
    return;

  stopArray.forEach(function (s, i) {
    var $tr = $('<tr />');

    var $tdLetter = $('<td />')
      .attr('scope', 'col')
      .text(letters[i]);
    var $tdTaxAddress = $('<td />') // Changed from MLS ID to Tax Address
      .attr('scope', 'col')
      .text(s.listing.taxAddress.replace(/,([^,]*,[^,]*$)/, '$1')) // This line changes the value from MLS ID to Tax Address
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
    $tr.append($tdTaxAddress); // Changed from MLS ID to Tax Address
    $tr.append($tdStatus);
    $tdClose.append($tdCloseButton);
    $tr.append($tdClose);

    $('#routeTableBody').append($tr);
  });
}
