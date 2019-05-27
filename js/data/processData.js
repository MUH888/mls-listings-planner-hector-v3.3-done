function processData (excelData) {
  var mlsData = {
    listingStatus: [],
    listingStatusStyles: {},
    listingsByStatus: {},
    listings: []
  };

  mlsData.listingStatus = _.uniq(excelData
    .map(function (l) { return l['Listing Status']; })
    .sort()
  );

  mlsData.listingStatus.forEach(function (s, i) {
    mlsData.listingStatusStyles[s] = {
      colour: colours[i],
      icon: icons[i]
    };

    mlsData.listingsByStatus[s] = excelData.filter(function (l) {
      return l['Listing Status'] === s;
    });
  });

  mlsData.listings = excelData.map(function (l) {
    return {
      firstName: l['First Name'],
      lastName: l['Last Name'],
      phone: l['Phone 1'],
      email: l['Email 1'],
      statusChangeDate: l['Status Change Date'],
      mlsId: l['MLS ID'],
      listingStatus: l['Listing Status'],
      taxAddress: l['Tax Address'] + ', ' + l['Tax City'] + ', ' + l['Tax State'],
      address: l['Address'] + ', ' + l['City'] + ', ' + l['State'],
      latLng: cache[l['MLS ID']] ? cache[l['MLS ID']] : null
    };
  });
  
  return mlsData;
}