(function readTextFile() {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", "../../data.json", false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        const response = rawFile.responseText;
        alert(response);
      }
    }
  };
})();
