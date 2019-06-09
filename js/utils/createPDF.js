function createPDF () {
  var pdf = new jsPDF();
  var date = new Date();
  var y = 10;

  pdf.setProperties({
    title: 'Report-' + date.toDateString().split(' ').join('-'),
    author: 'Hector Chomat',
    creator: 'Hector Chomat',
    subject: 'MLS Listing Planner Report - ' + date.toDateString(),
    keywords: 'mls, real estate, multiple listing service, listings'
  });

  // Report title.
  pdf.setFontSize(14);
  pdf.text(10, y, 'MLS Listing Planner Report - ' + options.filename);
  y += 8;

  // Stops table.
  pdf.setFontSize(12);
  pdf.text(10, y, 'Stops');
  y += 6;

  var stopsHead = [
    ['', 'MLS ID', 'Listing Status', 'Notes'],
  ];
  var stopsBody = [];

  stopArray.forEach(function (s, i) {
    stopsBody.push([
      letters[i],
      s.mlsId,
      s.listingStatus,
      '__________________________________________________'
    ]);
  });

  pdf.setFontSize(12);
  pdf.autoTable({
    startY: y,
    head: stopsHead,
    body: stopsBody, 
    theme: 'plain',
    styles: {
      halign: 'center'
    }
  });

  // Directions links.
  y = pdf.previousAutoTable.finalY + 8;
  pdf.text(10, y, 'Directions');
  y += 8;

  pdf.setFontSize(8);
  stopArray.forEach(function (s, i) {
    pdf.text(10, y, letters[i] + ': ');
    pdf.setTextColor('#00F');

    pdf.textWithLink(s.listing.taxAddress, 15, y, {
      url: 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURI(s.listing.taxAddress)
    });
    pdf.setTextColor('#000');
    y += 6;
  });

  // Listing information tables.
  y += 8;
  pdf.setFontSize(12);
  pdf.text(10, y, 'Listing Information');
  y += 8;

  var listingsHeader1 = [
    ['', 'MLS ID', 'Name', 'Phone', 'Email', 'Type']
  ];
  var listingsHeader2 = [
    ['', 'Status', 'Tax Address', 'Price', 'Agent', 'Last Call Result']
  ];
  var listingsBody1 = [];
  var listingsBody2 = [];

  stopArray.forEach(function (s, i) {
    var l = s.listing;
    listingsBody1.push([
      letters[i],
      l.mlsId,
      l.fullName,
      l.phone,
      l.email,
      l.propertyType
    ]);
    listingsBody2.push([
      letters[i],
      l.listingStatus,
      l.taxAddress,
      l.price,
      l.listAgent,
      l.lastCallResult
    ]);
  });

  pdf.setFontSize(8);
  pdf.autoTable({
    startY: y,
    head: listingsHeader1,
    body: listingsBody1, 
    theme: 'plain',
    styles: {
      halign: 'center',
      cellPadding: 0.5
    }
  });

  y = pdf.previousAutoTable.finalY + 8;
  pdf.autoTable({
    startY: y,
    head: listingsHeader2,
    body: listingsBody2, 
    theme: 'plain',
    styles: {
      halign: 'center',
      cellPadding: 0.5
    }
  });

  // Add created date and time.
  pdf.setFontSize(12);
  y = pdf.previousAutoTable.finalY + 16;
  pdf.text(10, y, 'Created: ' + date.toDateString() + ' ' + date.toLocaleTimeString());

  pdf.save('Report-' + date.toDateString().split(' ').join('-') + '.pdf');
}
