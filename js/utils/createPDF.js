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
  y += 4;

  var stopsHead = [
    ['', 'MLS ID', 'Status', 'Tax Address', 'Subject Address', 'Notes'],
  ];
  var stopsBody = [];

  stopArray.forEach(function (s, i) {
    stopsBody.push([
      letters[i],
      s.mlsId,
      s.listingStatus,
      s.listing.taxAddress,
      s.listing.address,
      '_______________________'
    ]);
  });

  pdf.setFontSize(12);
  pdf.autoTable({
    startY: y,
    head: stopsHead,
    body: stopsBody, 
    theme: 'plain',
    styles: {
      fontSize: 8,
      halign: 'center',
      cellPadding: 0.5
    }
  });

  // Directions table.
  y = pdf.previousAutoTable.finalY + 8;
  pdf.text(10, y, 'Directions');
  y += 4;

  var directionsHead = [
    ['', 'URL'],
  ];
  var directionsBody = [];

  stopArray.forEach(function (s, i) {
    directionsBody.push([
      letters[i],
      encodeURI('https://google.com/maps/dir/?api=1&destination=' + s.listing.taxAddress)
      // s.listing.taxAddress,
      // s.listing.address
    ]);
  });

  pdf.setFontSize(6);
  pdf.autoTable({
    startY: y,
    head: directionsHead,
    body: directionsBody, 
    theme: 'plain',
    headStyles: {
      halign: 'center',
      cellPadding: 0.5
    },
    bodyStyles: {
      fontSize: 8,
      halign: 'left',
      cellPadding: 0.75,
      cellWidth: 'wrap'
    }
  });

  y = pdf.previousAutoTable.finalY + 8;
  pdf.setFontSize(12);
  pdf.text(10, y, 'Listing Information');
  y += 8;

  var listingsHeader1 = [
    ['', 'Name', 'Listing Status', 'Price', 'Last Call Result']
  ];
  var listingsHeader2 = [
    ['', 'Notes']
  ];
  var listingsBody1 = [];
  var listingsBody2 = [];

  stopArray.forEach(function (s, i) {
    var l = s.listing;
    listingsBody1.push([
      letters[i],
      l.fullName,
      l.listingStatus,
      l.price,
      l.lastCallResult
    ]);
    listingsBody2.push([
      letters[i],
      l.notes
    ]);
  });

  // Listing information table.
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

  // Notes table.
  y = pdf.previousAutoTable.finalY + 4;
  pdf.autoTable({
    startY: y,
    head: listingsHeader2,
    body: listingsBody2, 
    theme: 'plain',
    headStyles: {
      halign: 'center',
      cellPadding: 0.5
    },
    bodyStyles: {
      fontSize: 8,
      halign: 'left',
      cellPadding: 0.5
    }
  });

  // Add created date and time.
  pdf.setFontSize(12);
  y = pdf.previousAutoTable.finalY + 12;
  pdf.text(10, y, 'Created: ' + date.toDateString() + ' ' + date.toLocaleTimeString());

  // Save the PDF.
  pdf.save('Report-' + date.toDateString().split(' ').join('-') + '.pdf');
}
