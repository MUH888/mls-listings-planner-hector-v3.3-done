function createPDF() {
    var pdf = new jsPDF('p', 'mm', 'letter');
    var date = new Date();
    var formattedDate = date.toISOString().slice(0, 10); // Format date as YYYY-MM-DD
    var y = 20;

    // Retrieve the selected Agent and VA values
    var agentName = document.getElementById('selectAgent').value;
    var vaName = document.getElementById('selectVA').value;

    // Function to add footer with Agent and VA names
    function addFooter() {
        pdf.setFontSize(11);
        pdf.text(20, pdf.internal.pageSize.height - 10, agentName + ' | ' + vaName); // Adjust position if needed
    }

    pdf.setProperties({
        title: 'Report-' + formattedDate,
        author: 'Hector Chomat',
        creator: 'Hector Chomat',
        subject: formattedDate + ' - Red Folder Routine Planner',
        keywords: 'real estate, real estate listings, mls, multiple listing service, google maps'
    });

    // Report title
    pdf.setFontSize(14);
    pdf.text(10, y, formattedDate + ' - Red Folder Routine Planner');
    y += 8;

    // Stops table
    pdf.setFontSize(12);
    pdf.text(10, y, 'Stops');
    y += 4;

    var stopsHead = [
        ['', 'Tax Address', 'Listing Status', 'Notes'],
    ];
    var stopsBody = [];

    stopArray.forEach(function (s, i) {
        stopsBody.push([
            (i + 1).toString(), // Rank by number
            s.listing.fullName + '\n\n' + s.listing.taxAddress.replace(/,([^,]*,[^,]*$)/, '$1') + '\n\n' + s.listing.mlsId + '\n\n' + s.listing.daysOnMarket + ' days\n\n' + s.listing.phone,
            s.listingStatus,
            '_____________________________\n\n_____________________________\n\n_____________________________\n\n_____________________________\n\n\n\n\n' // 4 lines for notes with space after each property
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
            lineHeight: 2.0 // Add spacing between lines
        },
        showHead: 'firstPage', // This ensures the header only appears on the first page
        didDrawPage: function (data) {
            addFooter(); // Add the footer on each page
            y = 20; // Reset Y for the next section
        }
    });

    // Start new page for Directions table
    pdf.addPage();
    y = 20;

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
        pdf.text(15, y, (i + 1).toString()); // Rank by number

        pdf.setTextColor('#00F');
        pdf.textWithLink(s.listing.taxAddress.replace(/,([^,]*,[^,]*$)/, '$1'), 25, y, {
            url: encodeURI('https://www.google.com/maps/dir/?api=1&destination=' + s.listing.taxAddress.replace(/,([^,]*,[^,]*$)/, '$1'))
        });

        pdf.setTextColor('#000');
        pdf.text(25 + tab + 20, y, s.listing.address.replace(/,([^,]*,[^,]*$)/, '$1'));
        y += 10; // Increased space between lines
    });

    // Add the footer again since a new page was added
    addFooter();

    // Start new page for Listing Information
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
            (i + 1).toString(), // Rank by number
            l.fullName,
            l.listingStatus,
            l.price,
            l.lastCallResult
        ]);
        notesBody.push([
            (i + 1).toString(), // Rank by number
            l.notes // Use the actual notes from the listing
        ]);
    });

    // Listings information table
    pdf.autoTable({
        startY: y,
        head: listingsHeader,
        body: listingsBody,
        theme: 'plain',
        styles: {
            fontSize: 11,
            halign: 'left', // Align columns to the left
            cellPadding: 0.5
        },
        didDrawPage: function (data) {
            addFooter(); // Add the footer on each page
        }
    });

    // Adjust Y position for the Notes table to start immediately after Listings table
    y = pdf.previousAutoTable.finalY + 12;

    pdf.setFontSize(12);
    pdf.text(10, y, 'Notes');
    y += 4;

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
            lineHeight: 2.0 // Add spacing between lines
        },
        didDrawPage: function (data) {
            addFooter(); // Add the footer on each page
        }
    });

    // Add created date and time
    pdf.setFontSize(12);
    y = pdf.previousAutoTable.finalY + 12;
    pdf.text(10, y, 'Created: ' + formattedDate + ' ' + date.toLocaleTimeString());

    // Add the footer one last time at the end of the document
    addFooter();

    // Save the PDF
    pdf.save('Report-' + formattedDate + '.pdf');
}
