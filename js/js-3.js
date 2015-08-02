// 課題 JS-3 の実装をここに記述してください。

var submit_button = document.getElementById('submit-button');
var container = document.getElementById('table-container');

submit_button.addEventListener('click', function() {
  var input_logs = document.getElementById('log-input').value;
  var parsed_logs = parseLTSVLog(input_logs);

  createLogTable(container, parsed_logs);
});
