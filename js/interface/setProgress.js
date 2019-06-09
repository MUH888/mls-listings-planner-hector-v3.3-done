function setProgress (increase) {
  progress += increase;
  
  if (progress > 100)
    progress = 100;

  $('#progressBar').text(progress.toFixed(1) + '%');
  $('#progressBar').css('width', progress.toFixed(1) + '%');
}