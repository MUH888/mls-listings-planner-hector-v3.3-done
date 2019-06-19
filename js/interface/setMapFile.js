function setMapFile () {
  var date = new Date();

  $('#buttonSaveMap').attr('download', 'map-' + date.toDateString().split(' ').join('-') + '.json');
  $('#buttonSaveMap').attr('href', 
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
      'data': data,
      'options': options,    
      'stopArray': stopArray.getArray()
    }))
  );
}