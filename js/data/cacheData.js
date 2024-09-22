function cacheData(newData) {
  const newCache = _.extend(cache, newData);
  setStorageValue('cache', newCache);
}