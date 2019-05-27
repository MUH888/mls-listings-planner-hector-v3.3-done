function cacheData (newData) {
  var newCache = _.extend(cache, newData);
  setStorageValue('cache', newCache);
}