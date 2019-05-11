$(function () {

  var listings;
  var statusFilter;

  createMap();

  $('#greeting').text(greeting());

  $('#excel').change(function (e) {

    $('#excelLoading').removeClass('hidden');
    $('#excelMessageNotStarted').addClass('hidden');

    if (e.target.files.length < 1)
      return;

    //var filename = ;
    // console.log({
    //   filename: e.target.files[0].name,
    //   file: e.target.files[0]
    // });

    readExcelData(e.target.files[0], function (err, data) {
    
      if (err) {
        $('#excelMessageError').removeClass('hidden');
        $('#excelMessageError').text('Error: ' + err);
        return;
      }

      listings = data;
      var filename = e.target.files[0].name;

      $('#excel').attr('disabled', null);
      
      $('#excelLoading').addClass('hidden');
      $('#excelMessageSuccess').removeClass('hidden');
      $('#statusFilter').removeClass('hidden');
      $('#buttonEmail').removeClass('hidden');
      $('#buttonClear').removeClass('hidden');

      var statuses = _.uniq(listings
        .map(function (l) { return l['Listing Status']; })
        .sort()
      );

      var summary = {};
      statusFilter = {};

      statuses.forEach(function (s) {
        summary[s] = listings.filter(function (l) { 
          return l['Listing Status'] === s;
        }).length;

        statusFilter[s] = false;
      });
      
      $('#excelFileLabel').text('File: ' + filename)
      $('#excelRowCount').text(listings.length);
      $('#excelFileName').text(filename);

      console.log(summary);

      statuses.forEach(function (s) {
        var $div = $('<div />').attr('class', 'form-check');
        var $input = $('<input />')
          .attr('class', 'form-check-input')
          .attr('type', 'checkbox')
          .attr('value', s);
        var $label = $('<label />')
          .attr('class', 'form-check-label')
          .html(s + ' <span class="badge badge-primary">' + summary[s] + '</span>');

        $div.append($input);
        $div.append($label);

        $('#statusFilter').append($div);
      });

      $('.form-check-input').change(function (e) {
        statusFilter[e.target.value] = !statusFilter[e.target.value];
        console.log(statusFilter);
      });

      //console.log({ data: data });
    });
  });
});