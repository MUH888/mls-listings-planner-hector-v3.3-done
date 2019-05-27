function setProgress (increase) {
  //var progress = Number($('#progressBar').css('width').split('%')[0]);
  progress += increase;
  
  if (progress > 100)
    progress = 100;

  $('#progressBar').text(progress.toFixed(1) + '%');
  $('#progressBar').css('width', progress.toFixed(1) + '%');
}