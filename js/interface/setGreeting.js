function setGreeting() {
  const now = new Date();
  const morning = new Date();
  const afternoon = new Date();
  const evening = new Date();
  let greeting;

  morning.setHours(6, 0, 0);
  afternoon.setHours(12, 0, 0);
  evening.setHours(18, 0, 0);

  if (now >= morning && now <= afternoon) {
    greeting = 'Good morning';
  } else if (now >= afternoon && now <= evening) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  $('#greeting').text(greeting);
}
