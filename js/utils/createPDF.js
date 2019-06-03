function createPDF () {
  var pdf = new jsPDF();
  var date = new Date();

  pdf.setProperties({
    title: options.filename,
    author: 'Hector Chomat',
    creator: 'Hector Chomat',
    subject: 'MLS Listings for ' + date.toLocaleDateString(),
    keywords: 'mls, real estate, multiple listing service, listings'
  });

  pdf.setFontSize(14);
  pdf.text(10, 10, 'Date: ' + date.toLocaleDateString());
  //pdf.text(10, 24, 'String');
  // pdf.setFontSize(12);
  // pdf.text(10, 36, $('#resultString').text());

  pdf.setFontSize(14);
  pdf.text(10, 50, 'Table');

  pdf.setFontSize(12);
  pdf.autoTable({
    html: '#routeTable',
    theme: 'plain',
    margin: { top: 70 },
    styles: {
      fontSize: 14,
      tableLineWidth: 1
    }
  });

  pdf.save(options.filename.split('.')[0] + '.pdf');
}