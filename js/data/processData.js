function processData (excelData) {
  var data = {
    listingStatus: [],
    listingsByStatus: {},
    listings: []
  };

  data.listingStatus = _.uniq(excelData
    .map(function (l) { return l['Listing Status']; })
    .sort()
  );

  data.listingStatus.forEach(function (s) {
    data.listingsByStatus[s] = excelData.filter(function (l) {
      return l['Listing Status'] === s;
    });
  });

  data.listings = excelData.map(function (l) {
    return {
      mlsId: l['MLS ID'],
      fullName: l['Full Name'],
      phone: l['Phone 1'] ? l['Phone 1'] : l['Mobile Phone'],
      email: l['Email 1'],
      price: l['List Price'],
      notes: l['Notes'],
      listAgent: l['List Agent'],
      expiredDate: l['Expired Date'],
      propertyType: l['Property Type'],
      lastCallResult: l['Last Call Result'],
      statusChangeDate: l['Status Change Date'],
      listingStatus: l['Listing Status'],
      taxAddress: l['Tax Address'] + ', ' + l['Tax City'] + ', ' + l['Tax State'] + ' ' + l['Tax Postal Code'],
      address: l['Address'] + ', ' + l['City'] + ', ' + l['State'] + ' ' + l['Zip Code'],
      latLng: cache[l['MLS ID']] ? cache[l['MLS ID']] : null
    };
  });
  
  return data;
}