document.onreadystatechange = () => {
  if (document.readyState === 'complete') 
    defineListeners();
};

function readExcel (e) {
  var file = e.target.files[0];

  var reader = new FileReader();

  reader.onload = function (event) {
    var data = event.target.result;
    var wb = XLSX.read(data, { type: 'binary' });

    //console.log(wb);

    wb.SheetNames.forEach(function(sheet) {
      //var x = XLSX.utils.
      console.log(XLSX.utils.sheet_to_json(wb.Sheets[sheet], { defval: null }));
    });
  }

  reader.onerror = function (ex) {
    console.log(ex);
  }

  reader.readAsBinaryString(file);
}

function defineListeners () {
  document.getElementById('excel').addEventListener('change', readExcel, false);

  console.log('Hello world!');
}