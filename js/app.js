$(function () {
  createMap('map');

  setGreeting();

  if (!verifyStorage()) {
    $('#messageWebStorage').removeClass('hidden');
  } else {
    cache = getStorageValue('cache');
    if (!cache)
      cache = {};
  }
  //console.log(cache);
    
  $('#fileExcel').change(function (e) {

    if (e.target.files[0].type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      $('#messageImport').removeClass('hidden');
      $('#messageImport').html('<b>Error:</b> Imported file must be an Excel worksheet (.xlsx).');
      return;
    }

    $('#containerImport').addClass('hidden');
    $('#containerFilter').removeClass('hidden');

    $('#messageImport').addClass('hidden'); // Hide start and error message and show loading spinner.
    $('#spinner').removeClass('hidden');
    
    readData(e.target.files[0], function (err, excelData) {
    
      if (err) {
        $('#messageImport').removeClass('hidden');
        $('#messageImport').html('<b>Error:</b> ' + err);
        return;
      }

      options.filename = e.target.files[0].name;
      $('label.custom-file-label').text('File: ' + options.filename);

      data = processData(excelData);
      //console.log(data);

      $('#spinner').addClass('hidden');

      $('#excelFileName').text(options.filename);
      $('#excelRowCount').text(excelData.length);
      $('#contentFilter').removeClass('hidden');

      appendListingStatusFilter();
    });
  });

  $('#buttonNext').click(function () {
    $('#containerFilter').addClass('hidden');
    $('#containerGeocode').removeClass('hidden')

    var completeListings = data.listings.filter(function (l) {
      return options.listingStatusFilter[l.listingStatus] && l.latLng;
    });
    var incompleteListings = data.listings.filter(function (l) {
      return options.listingStatusFilter[l.listingStatus] && !l.latLng 
    });

    geocodeMap(incompleteListings, function (geocodedListings) {
      geocodedCache = {};
      geocodedListings.forEach(function (l) {
        geocodedCache[l.mlsId] = l.latLng;
      });

      cacheData(geocodedCache);

      $('#containerGeocode').addClass('hidden');
      $('#containerRoute').removeClass('hidden');
      $('#containerActions').removeClass('hidden');

      var listings = _.extend(completeListings, geocodedListings);
      populateMap(listings);
    });
  });

  var clipboard = new ClipboardJS('#buttonCopyString');

  $('#buttonSavePdf').click(function () {
    createPDF();
  });

  $('#buttonSaveMap').click(function () {
    console.log('TODO: Implement save map.');
  });
}); 

// $('#buttonBack').click(function () {
  //   $('#containerRoute').addClass('hidden');
  //   $('#containerFilter').removeClass('hidden');
  // });