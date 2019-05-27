function verifyStorage () {
  if (typeof(Storage) !== 'undefined')
    return true;
  else 
    return false;
}

function setStorageValue (key, value) {
  localStorage[key] = JSON.stringify(value);
}

function getStorageValue (key) {
  return JSON.parse(localStorage[key] ? localStorage[key] : null);
}

function removeStorageValue (key) {
  localStorage.removeItem(key);
}