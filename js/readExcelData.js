function readExcelData (file, callback) {
  var reader = new FileReader();

  reader.onload = function (e) {
    var w = XLSX.read(e.target.result, { type: 'binary' });
    var data = XLSX.utils.sheet_to_json(w.Sheets[w.SheetNames[0]], { defval: null });
    callback(null, data);
  };

  reader.onerror = function (err) {
    console.log(err);
    callback(err, null);
  };

  reader.readAsBinaryString(file);
}