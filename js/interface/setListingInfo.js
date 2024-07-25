function setListingInfo (l) {
  $('#tMlsId').text(l.mlsId);
  $('#tStatusChangeDate').text(l.statusChangeDate);
  $('#tPropertyType').text(l.propertyType);
  $('#tLastCallResult').text(l.lastCallResult);
  $('#tFullName').text(l.fullName);
  $('#tListingStatus').text(l.listingStatus);
  $('#tAddress').text(l.address);
  $('#tTaxAddress').text(l.taxAddress);
  $('#tPhone').text(l.phone);
  $('#tEmail').text(l.email);
  $('#tListPrice').text(l.price);
  $('#tNotes').text(l.notes);
}