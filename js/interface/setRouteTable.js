function setRouteTable() {
  $('#routeTableBody').html(''); 

  if (stopArray.getLength() === 0) {
    return;
  }

  stopArray.forEach(function (s, i) {
    const $tr = $('<tr />');

    const $tdLetter = $('<td />')
      .attr('scope', 'col')
      .css('text-align', 'left') // Align text to the left
      .text(letters[i]);
    const $tdTaxAddress = $('<td />') // Changed from MLS ID to Tax Address
      .attr('scope', 'col')
      .css('text-align', 'left') // Align text to the left
      .text(s.listing.taxAddress.replace(/,([^,]*,[^,]*$)/, '$1')) // This line changes the value from MLS ID to Tax Address
      .mouseover(function () {
        setListingInfo(stopArray.getAt(i).listing);
      });
    const $tdStatus = $('<td />')
      .attr('scope', 'col')
      .css('text-align', 'left') // Align text to the left
      .text(s.listingStatus);
    const $tdClose = $('<td />')
      .attr('scope', 'col')
      .css('text-align', 'left'); // Align text to the left
    const $tdCloseButton = $('<button />')
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
