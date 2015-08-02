var searchButton = document.getElementById('search-button');
var container = document.getElementById('table-container');
var i;

searchButton.addEventListener('click', function() {
  var input_logs = document.getElementById('log-input').value;
  var filterQuery = document.getElementById('filterQuery').value;
  var parsed_logs = parseLTSVLog(input_logs);
  var extract_logs = filterLogsByPath(filterQuery, parsed_logs);

  createLogTable(container, extract_logs);
});

function filterLogsByPath(query, logs) {
  var result = [];

  for (i = 0; i < logs.length; i++) {
    var path = logs[i].req.split(" ")[1];
    console.log(path);
    if (query === path) {
      result.push(logs[i]);
    }
  }

  return result;
}
