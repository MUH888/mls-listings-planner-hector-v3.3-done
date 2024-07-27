function setListingInfo (l) {
  $('#tMlsId').text(l.mlsId);
  $('#tStatusChangeDate').text(l.statusChangeDate);
  $('#tPropertyType').text(l.propertyType);
  $('#tLastCallResult').text(l.lastCallResult);
  $('#tFullName').text(l.fullName);
  $('#tListingStatus').text(l.listingStatus);
  $('#tTaxAddress').text(l.taxAddress.replace(/,([^,]*,[^,]*$)/, '$1'));  
  $('#tAddress').text(l.address.replace(/,([^,]*,[^,]*$)/, '$1'));
  $('#tPhone').text(l.phone);
  $('#tEmail').text(l.email);
  $('#tListPrice').text(l.price);
  $('#tNotes').text(l.notes);
}
