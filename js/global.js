var data = {},
    options = {};

$(function () {
  createMap();

  $('#greeting').text(greeting());

  if (!verifyStorage())
    $('#webStorageError').removeClass('hidden');

  $('#excel').change(function (e) {

    if (e.target.files.length < 1)
      return;

    // Hide start message and show loading spinner.
    $('#excelImportLoading').removeClass('hidden');
    $('#excelMessageStart').addClass('hidden');

    readExcelData(e.target.files[0], function (err, excelData) {
    
      if (err) {
        $('#excelMessageError').removeClass('hidden');
        $('#excelMessageError').html('<b>Error:</b> ' + err);
        return;
      }

      options.filename = e.target.files[0].name;

      data = processData(excelData);
      console.log(data);

      $('#excel').attr('disabled', 'disabled');
      $('label.custom-file-label').text('File: ' + options.filename);
      
      $('#excelImportLoading').addClass('hidden');
      $('#excelImportSuccess').removeClass('hidden');

      $('#excelRowCount').text(excelData.length);
      $('#excelFileName').text(options.filename);

      options.listingStatusFilter = {};

      data.statuses.forEach(function (s) {
        options.listingStatusFilter[s] = false;

        var $div = $('<div />').attr('class', 'form-check');
        var $input = $('<input />')
          .attr('class', 'form-check-input')
          .attr('type', 'checkbox')
          .attr('value', s);
        var $i = $('<i />')
          .attr('class', 'fa fa-map-marker fa-lg mr-1')
          .attr('style', 'color:' +  data.colours[s].colour);
        var $label = $('<label />')
          .attr('class', 'form-check-label')
          .html(s + ' <span class="badge badge-primary">' + data.listingsByStatus[s].length + '</span>');

        $div.append($input);
        $div.append($i);
        $div.append($label);  
        $('#filterByListingStatus').append($div);
      });

      $('.form-check-input').change(function (e) {
        options.listingStatusFilter[e.target.value] = !options.listingStatusFilter[e.target.value]
        console.log(options.listingStatusFilter);

        addMarkers(e.target.value);
      });
    });
  });

  // $('#buttonPlot').click(function () {
  //   addMarkers()
  // });
});
