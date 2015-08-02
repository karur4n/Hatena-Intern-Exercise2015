var searchButton = document.getElementById('search-button');
var container = document.getElementById('table-container');
var i;

searchButton.addEventListener('click', function() {
  var input_logs = document.getElementById('log-input').value;

  var userQueryValue = document.getElementById('userQuery').value;
  var pathQueryValue = document.getElementById('pathQuery').value;
  var statusQueryValue = document.getElementById('statusQuery').value;

  var queryHash = {
    'user': userQueryValue,
    'path': pathQueryValue,
    'status': statusQueryValue
  };

  var parsedLogs = parseLTSVLog(input_logs);

  for (key in queryHash) {
    if (!(queryHash[key] === "")) {
      parsedLogs = filterLogs(key, queryHash[key], parsedLogs);
    }
  }

  createLogTable(container, parsedLogs);
});

function filterLogs(queryType, queryValue, logs) {
  var result = [];

  for (i = 0; i < logs.length; i++) {
    switch (queryType) {
      case 'user':
        var user = logs[i].user;
        if (queryValue === user) {
          result.push(logs[i]);
        }
        break;
      case 'path':
        var path = logs[i].req.split(" ")[1];
        if (queryValue === path) {
          result.push(logs[i]);
        }
        break;
      case 'status':
        var status = logs[i].status;
        if (queryValue === status) {
          result.push(logs[i]);
        }
        break;
    }
  }

  return result;
}
