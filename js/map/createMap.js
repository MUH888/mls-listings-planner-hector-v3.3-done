function createMap (elementId) {
  
  map = new google.maps.Map(document.getElementById(elementId), {
    center: { lat: 25.763, lng: -80.193 },  // Miami, FL.
    mapTypeControl: false,
    rotateControl: false,
    zoom: 11
  });
  // infoWindow = new google.maps.InfoWindow({
  //   maxWidth: 250
  // });
  bounds = new google.maps.LatLngBounds();
  geocoder = new google.maps.Geocoder();
  markers = [];

  // map.addListener('click', function () {
  //   infoWindow.close();
  // });

  stopArray = new google.maps.MVCArray();
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer({ 
    preserveViewport: true
  });

  var resetControlDiv = document.createElement('div');
  var resetControl = new ResetControl(resetControlDiv);

  var undoControlDiv = document.createElement('div');
  var undoControl = new UndoControl(undoControlDiv);

  resetControlDiv.index = 1;
  undoControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(resetControlDiv);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(undoControlDiv);

  directionsDisplay.addListener('directions_changed', function () {
    //console.log('Directions changed.');
    if (stopArray.length === 0) {
      $('#messageRoute').removeClass('hidden');
      $('#contentRoute').addClass('hidden');
    } else {
      $('#messageRoute').addClass('hidden');
      $('#contentRoute').removeClass('hidden');
    }

    setRouteTable();
    setRouteString();
  });
}

function UndoControl (undoDiv) {
  // Set CSS for the control border.
  var undoButton = document.createElement('div');
  undoButton.style.backgroundColor = '#fff';
  undoButton.style.border = '2px solid #fff';
  undoButton.style.borderRadius = '3px';
  undoButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  undoButton.style.cursor = 'pointer';
  undoButton.style.marginTop = '10px';
  undoButton.style.marginLeft = '10px';
  undoButton.style.marginBottom = '10px';
  undoButton.style.textAlign = 'center';
  undoButton.title = 'Click to undo stop.';
  undoDiv.appendChild(undoButton);

  // Set CSS for the control interior.
  var undoText = document.createElement('div');
  undoText.style.color = 'rgb(25,25,25)';
  undoText.style.fontFamily = 'Roboto,Arial,sans-serif';
  undoText.style.fontSize = '16px';
  undoText.style.lineHeight = '38px';
  undoText.style.paddingLeft = '5px';
  undoText.style.paddingRight = '5px';
  undoText.innerHTML = 'Undo Stop';
  undoButton.appendChild(undoText);

  undoButton.addEventListener('click', function () {
    stopArray.pop();
    if (stopArray.length === 1) // Pop again if only one stop remains.
      stopArray.pop();

    setRouteString();
    setRouteTable();
    updateDirections();
  });
}

function ResetControl (resetDiv) {
  // Set CSS for the control border.
  var resetButton = document.createElement('div');
  resetButton.style.backgroundColor = '#fff';
  resetButton.style.border = '2px solid #fff';
  resetButton.style.borderRadius = '3px';
  resetButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  resetButton.style.cursor = 'pointer';
  resetButton.style.marginTop = '10px';
  resetButton.style.marginLeft = '10px';
  resetButton.style.marginBottom = '22px';
  resetButton.style.textAlign = 'center';
  resetButton.title = 'Click to reset stops.';
  resetDiv.appendChild(resetButton);

  // Set CSS for the control interior.
  var resetText = document.createElement('div');
  resetText.style.color = 'rgb(25,25,25)';
  resetText.style.fontFamily = 'Roboto,Arial,sans-serif';
  resetText.style.fontSize = '16px';
  resetText.style.lineHeight = '38px';
  resetText.style.paddingLeft = '5px';
  resetText.style.paddingRight = '5px';
  resetText.innerHTML = 'Reset Stops';
  resetButton.appendChild(resetText);

  resetButton.addEventListener('click', function () {
    stopArray.clear();

    setRouteString();
    setRouteTable();
    updateDirections();
  });
}
