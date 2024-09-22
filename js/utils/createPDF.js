function createPDF() {
    const pdf = new jsPDF('p', 'mm', 'letter');
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10); // Format date as YYYY-MM-DD
    let y = 20;
    
    // Retrieve the selected Agent and VA values
    const agentName = document.getElementById('selectAgent').value;
    const vaName = document.getElementById('selectVA').value;
    
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

    const stopsHead = [
        ['', 'Tax Address', 'Listing Status', 'Notes'],
    ];
    const stopsPerPage = 4; // Limit to 4 stops per page
    let stopCounter = 0; // Counter for stops
    let stopsBody = [];
    let pageCounter = 1; // To track the page number for the stops table

    stopArray.forEach(function (s, i) {
        // Add stop data to the stopsBody array
        stopsBody.push([
            (i + 1).toString(), // Rank by number
            s.listing.fullName + '\n\n' + s.listing.taxAddress.replace(/,([^,]*,[^,]*$)/, '$1') + '\n\n' + s.listing.mlsId + '\n\n' + s.listing.daysOnMarket + ' days  |  DOB: ____________\n\n' + s.listing.phone,
            s.listingStatus,
            '_____________________________\n\n_____________________________\n\n_____________________________\n\n_____________________________\n\n\n\n\n' // 4 lines for notes with space after each property
        ]);        

        stopCounter++; // Increment the stop counter

        // Check if we've reached the limit of stops per page
        if (stopCounter % stopsPerPage === 0) {
            pdf.autoTable({
                startY: y,
                head: stopsHead,
                body: stopsBody,
                theme: 'plain',
                styles: {
                    fontSize: 11,
                    halign: 'left',
                    cellPadding: 0.5,
                    lineHeight: 2.0
                },
                showHead: (pageCounter === 1) ? 'firstPage' : 'never', // Show header only on the first page
            });

            // Add a new page and reset stopsBody for the new page
            pdf.addPage();
            y = 20;
            stopsBody = [];
            pageCounter++; // Increment the page counter
        }
    });

    // Draw the remaining stops if any
    if (stopsBody.length > 0) {
        pdf.autoTable({
            startY: y,
            head: stopsHead,
            body: stopsBody,
            theme: 'plain',
            styles: {
                fontSize: 11,
                halign: 'left',
                cellPadding: 0.5,
                lineHeight: 2.0
            },
            showHead: (pageCounter === 1) ? 'firstPage' : 'never', // Show header only on the first page
        });
    }

    // Start new page for Directions table
    pdf.addPage();
    y = 20;

    pdf.setFontSize(12);
    pdf.text(10, y, 'Directions');
    y += 10;

    pdf.setFontSize(11);
    let tab = 0;
    stopArray.forEach(function (s) {
        const width = pdf.getTextDimensions(s.listing.address.replace(/,([^,]*,[^,]*$)/, '$1')).w;
        if (width > tab)
            tab = width;
    });

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(25, y, 'Tax Address');
    pdf.text(25 + tab + 20, y, 'Subject Address'); // Increased space between columns
    y += 6;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
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

    // Start new page for Listing Information
    pdf.addPage();
    y = 20;

    pdf.setFontSize(12);
    pdf.text(10, y, 'Listing Information');
    y += 4;

    const listingsHeader = [
        ['', 'Name', 'Listing Status', 'Price', 'Last Call Result']
    ];
    const listingsBody = [];

    const notesHeader = [
        ['', 'Notes']
    ];
    const notesBody = [];

    stopArray.forEach(function (s, i) {
        const l = s.listing;
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
        }
    });

    // After adding all content, calculate the total number of pages
    const totalPages = pdf.internal.getNumberOfPages();

    // Loop through each page to add the footer
    for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        addFooter(i, totalPages);
    }

    // Save the PDF
    pdf.save('Report-' + formattedDate + '.pdf');

    // Footer function
    function addFooter(pageNumber, totalPages) {
        // Left side: "Created" label in bold with the date
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold'); // Set font to bold
        pdf.text(20, pdf.internal.pageSize.height - 10, 'Created:');
        pdf.setFont('helvetica', 'normal'); // Revert font to normal
        pdf.text(36, pdf.internal.pageSize.height - 10, formattedDate);

        // Center: Agent Name | VA Name (larger font size)
        pdf.setFontSize(12);
        pdf.text(pdf.internal.pageSize.width / 2, pdf.internal.pageSize.height - 10, agentName + ' | ' + vaName, { align: 'center' });

        // Right side: page number of total pages
        pdf.setFontSize(10);
        pdf.text(pdf.internal.pageSize.width - 30, pdf.internal.pageSize.height - 10, pageNumber + ' of ' + totalPages);
    }
}
