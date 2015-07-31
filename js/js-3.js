// 課題 JS-3 の実装をここに記述してください。

var submit_button = document.getElementById('submit-button');
var container = document.getElementById('table-container');

submit_button.addEventListener('click', function() {
  var input_log = document.getElementById('log-input').value;
  var parsed_log = parseLTSVLog(input_log);

  createLogTable(container, parsed_log);
});
