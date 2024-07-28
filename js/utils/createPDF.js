function createPDF() {
    var pdf = new jsPDF('p', 'mm', 'letter');
    var date = new Date();
    var y = 20;
  
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
      ['', 'Tax Address', 'Listing Status', 'Notes'],
    ];
    var stopsBody = [];
  
    stopArray.forEach(function (s, i) {
      stopsBody.push([
        letters[i],
        s.listing.taxAddress.replace(/,([^,]*,[^,]*$)/, '$1'), // Use taxAddress
        s.listingStatus,
        '_____________________________\n\n_____________________________\n\n_____________________________\n\n_____________________________\n\n\n' // 3 lines for notes with reduced space after each property
      ]);
    });
  
    pdf.autoTable({
      startY: y,
      head: stopsHead,
      body: stopsBody,
      theme: 'plain',
      styles: {
        fontSize: 11,
        halign: 'left', // Align columns to the left
        cellPadding: 0.5,
        lineHeight: 1.5 // Add spacing between lines
      },
      didDrawPage: function (data) {
        // Avoid overlapping headers when a new page starts
        if (data.pageNumber !== 1) {
          y = 20;
        }
      }
    });
  
    // Directions table.
    y = pdf.previousAutoTable.finalY + 15; // Increased space between sections
    pdf.setFontSize(12);
    pdf.text(10, y, 'Directions');
    y += 10;
  
    pdf.setFontSize(11);
    var tab = 0;
    stopArray.forEach(function (s) {
      var width = pdf.getTextDimensions(s.listing.address.replace(/,([^,]*,[^,]*$)/, '$1')).w;
      if (width > tab)
        tab = width;
    });
  
    pdf.setFontSize(11);
    pdf.setFontStyle('bold');
    pdf.text(25, y, 'Tax Address');
    pdf.text(25 + tab + 20, y, 'Subject Address'); // Increased space between columns
    y += 6;
  
    pdf.setFontSize(11);
    pdf.setFontStyle('normal');
    stopArray.forEach(function (s, i) {
      pdf.text(15, y, letters[i]);
  
      pdf.setTextColor('#00F');
      pdf.textWithLink(s.listing.taxAddress.replace(/,([^,]*,[^,]*$)/, '$1'), 25, y, {
        url: encodeURI('https://www.google.com/maps/dir/?api=1&destination=' + s.listing.taxAddress.replace(/,([^,]*,[^,]*$)/, '$1'))
      });
  
      pdf.setTextColor('#000');
      pdf.text(25 + tab + 20, y, s.listing.address.replace(/,([^,]*,[^,]*$)/, '$1'));
      y += 10; // Increased space between lines
    });
  
    pdf.addPage();
    y = 20;
  
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
        l.notes // Use the actual notes from the listing
      ]);
    });
  
    // Listings information table.
    pdf.autoTable({
      startY: y,
      head: listingsHeader,
      body: listingsBody,
      theme: 'plain',
      styles: {
        fontSize: 11,
        halign: 'left', // Align columns to the left
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
        fontSize: 11,
        halign: 'left', // Align columns to the left
        cellPadding: 0.25,
        lineHeight: 1.5 // Add spacing between lines
      }
    });
  
    // Add created date and time.
    pdf.setFontSize(12);
    y = pdf.previousAutoTable.finalY + 12;
    pdf.text(10, y, 'Created: ' + date.toDateString() + ' ' + date.toLocaleTimeString());
  
    // Save the PDF.
    pdf.save('Report-' + date.toDateString().split(' ').join('-') + '.pdf');
  }
  