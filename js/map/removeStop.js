function removeStop (i) {
  stopArray.removeAt(i);

  if (stopArray.getLength() === 1)
    stopArray.pop();

  setRouteString();
  setRouteTable();
  updateDirections();
}