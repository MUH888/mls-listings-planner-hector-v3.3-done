function readMapFile(file, callback) {
  const reader = new FileReader();

  reader.onload = function (e) {
    callback(null, JSON.parse(e.target.result));
  };

  reader.onerror = function (err) {
    console.log(err);
    callback(err, null);
  };

  reader.readAsText(file);
}