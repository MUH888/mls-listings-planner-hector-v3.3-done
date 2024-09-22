function formatPhoneNumber(phone) {
  if (!phone) {
    return ''; // Return an empty string if phone number is undefined or null
  }
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

function formatPrice(price) {
  if (isNaN(price) || price === null) {
    return ''; // Return an empty string if price is not a number or is null
  }
  // Use Intl.NumberFormat to format the price without cents
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // No decimal places
    maximumFractionDigits: 0 // No decimal places
  }).format(price);
}

function processData(excelData) {
  let data = {
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
      phone: l['Phone 1'] ? formatPhoneNumber(l['Phone 1']) : formatPhoneNumber(l['Mobile Phone']),
      email: l['Email 1'],
      price: formatPrice(l['List Price']),
      notes: l['Notes'],
      listAgent: l['List Agent'],
      expiredDate: l['Expired Date'],
      propertyType: l['Property Type'],
      lastCallResult: l['Last Call Result'],
      statusChangeDate: l['Status Change Date'],
      listingStatus: l['Listing Status'],
      taxAddress: l['Mailing Address'] + ', ' + l['Mailing City'] + ', ' + l['Mailing State'] + ' ' + l['Mailing Zip Code'],
      address: l['Property Address'] + ', ' + l['Property City'] + ', ' + l['Property State'] + ' ' + l['Property Zip Code'],
      daysOnMarket: l['Days On Market'],
      latLng: cache[l['MLS ID']] ? cache[l['MLS ID']] : null
    };
  });

  return data;
}
