$(function () {
  createMap('map');

  $('#greeting').text(getGreeting());

  if (!verifyStorage())
    $('#webStorageError').removeClass('hidden');
  else {
    cache = getStorageValue('cache');
    if (!cache)
      cache = {};
  }
  console.log(cache);
    
  $('#excel').change(function (e) {

    if (e.target.files.length < 1) {
      $('#excelMessageError').removeClass('hidden');
      $('#excelMessageError').html('<b>Error:</b> An Excel workbook is required.');
      return;
    }

    if (e.target.files[0].type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      $('#excelMessageError').removeClass('hidden');
      $('#excelMessageError').html('<b>Error:</b> Imported file must be an Excel workbook (.xlsx).');
      return;
    }

    $('#excelMessageError').addClass('hidden'); // Hide start and error message and show loading spinner.
    $('#excelImportLoading').removeClass('hidden'); 
    $('#excelMessageStart').addClass('hidden');
    
    readData(e.target.files[0], function (err, excelData) {
    
      if (err) {
        $('#excelMessageError').removeClass('hidden');
        $('#excelMessageError').html('<b>Error:</b> ' + err);
        return;
      }

      options.filename = e.target.files[0].name;
      $('label.custom-file-label').text('File: ' + options.filename);

      data = processData(excelData);
      console.log(data);

      //$('#excel').attr('disabled', 'disabled');
      $('#excelImportLoading').addClass('hidden');

      $('#excelFileName').text(options.filename);
      $('#excelRowCount').text(excelData.length);
      
      $('#excelImportSuccess').removeClass('hidden');

      //options.listingStatusFilter = {};
      appendListingStatusFilter();
    });
  });

  $('#buttonNext').click(function () {

    $('#sectionOptions').addClass('hidden');
    $('#sectionProgress').removeClass('hidden')

    var completeListings = data.listings.filter(function (l) {
      return options.listingStatusFilter[l.listingStatus] && l.latLng;
    });
    var incompleteListings = data.listings.filter(function (l) {
      return options.listingStatusFilter[l.listingStatus] && !l.latLng 
    });

    geocodeMap(incompleteListings, function (geocodedListings) {
      console.log(geocodedListings);

      geocodedCache = {};
      geocodedListings.forEach(function (l) {
        geocodedCache[l.mlsId] = l.latLng;
      });

      cacheData(geocodedCache);

      $('#sectionProgress').addClass('hidden');
      $('#sectionRoute').removeClass('hidden')

      var listings = _.extend(completeListings, geocodedListings);
 
      populateMap(listings);
    });


    // populateMap(function () {
    //   //Progress callback.
    // }, function () {
    //   //Success callback.
    // });

    
    //$('#sectionRoute').removeClass('hidden');

    //return;
  });

  $('#buttonBack').click(function () {

    $('#sectionRoute').addClass('hidden');
    $('#sectionOptions').removeClass('hidden');

    //return;
  });
});