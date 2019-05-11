function greeting () {
  var now = new Date();
  var morning = new Date();
  var afternoon = new Date();
  var evening = new Date();
  
  morning.setHours(6, 0, 0);
  afternoon.setHours(12, 0, 0);
  evening.setHours(18, 0, 0);

  if (now >= morning && now <= afternoon)
    return 'Good morning';
  else if (now >= afternoon && now <= evening)
    return 'Good afternoon';
  else
    return 'Good evening';
}