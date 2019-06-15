function createPDF () {
  var pdf = new jsPDF();
  var date = new Date();
  var y = 10;

  pdf.setProperties({
    title: 'Report-' + date.toDateString().split(' ').join('-'),
    author: 'Hector Chomat',
    creator: 'Hector Chomat',
    subject: 'MLS Listing Planner Report - ' + date.toDateString(),
    keywords: 'real estate, real estate listings, mls, multiple listing service, google maps'
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

  pdf.autoTable({
    startY: y,
    head: stopsHead,
    body: stopsBody, 
    theme: 'plain',
    styles: {
      fontSize: 9,
      halign: 'center',
      cellPadding: 0.5
    }
  });

  // Directions table.
  y = pdf.previousAutoTable.finalY + 8;
  pdf.setFontSize(12);
  pdf.text(10, y, 'Directions');
  y += 6;

  pdf.setFontSize(10);
  pdf.setFontStyle('bold');
  pdf.text(30, y, 'Tax Address');
  pdf.text(100, y, 'Subject Address');
  y += 4;

  pdf.setFontSize(9);
  pdf.setFontStyle('normal');
  stopArray.forEach(function (s, i) {
    pdf.text(10, y, letters[i]);

    pdf.setTextColor('#00F');
    pdf.textWithLink(s.listing.taxAddress, 15, y, {
      url: encodeURI('https://www.google.com/maps/dir/?api=1&destination=' + s.listing.taxAddress)
    });

    pdf.setTextColor('#000');
    pdf.text(15 + (pdf.getTextDimensions(s.listing.taxAddress).w) + 5, y, s.listing.address);
    y += 4;
  });

  y += 4;
  pdf.setFontSize(12);
  pdf.text(10, y, 'Listing Information');
  y += 4;

  var listingsHeader = [
    ['', 'Name', 'Listing Status', 'Price', 'Last Call Result']
  ];
  var listingsBody = [];

  var notesHeader = [
    ['', 'Notes']
  ];
  var notesBody = [];

  stopArray.forEach(function (s, i) {
    var l = s.listing;
    listingsBody.push([
      letters[i],
      l.fullName,
      l.listingStatus,
      l.price,
      l.lastCallResult
    ]);
    notesBody.push([
      letters[i],
      l.notes
    ]);
  });

  // Listings information table.
  pdf.autoTable({
    startY: y,
    head: listingsHeader,
    body: listingsBody, 
    theme: 'plain',
    styles: {
      fontSize: 10,
      halign: 'left',
      cellPadding: 0.5
    }
  });

  // Notes table.
  y = pdf.previousAutoTable.finalY + 4;
  pdf.autoTable({
    startY: y,
    head: notesHeader,
    body: notesBody, 
    theme: 'plain',
    headStyles: {
      halign: 'center',
      cellPadding: 0.5
    },
    bodyStyles: {
      fontSize: 8,
      halign: 'left',
      cellPadding: 0.25
    }
  });

  // Add created date and time.
  pdf.setFontSize(12);
  y = pdf.previousAutoTable.finalY + 12;
  pdf.text(10, y, 'Created: ' + date.toDateString() + ' ' + date.toLocaleTimeString());

  // Save the PDF.
  pdf.save('Report-' + date.toDateString().split(' ').join('-') + '.pdf');
}
