function setListingInfo (l) {
  $('#tMlsId').text(l.mlsId);
  $('#tStatusChangeDate').text(l.statusChangeDate);
  $('#tFullName').text(l.fullName);
  $('#tListingStatus').text(l.listingStatus);
  $('#tAddress').text(l.address);
  $('#tTaxAddress').text(l.taxAddress);
  $('#tPhone').text(l.phone);
  $('#tListAgent').text(l.listAgent);
  $('#tEmail').text(l.email);
  $('#tListPrice').text(l.price);
  $('#tNotes').text(l.notes);
}