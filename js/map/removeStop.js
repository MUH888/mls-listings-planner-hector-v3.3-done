function removeStop(i) {
  stopArray.removeAt(i);
  setRouteString();
  setRouteTable();
  updateDirections();
}
