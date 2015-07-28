// 課題 JS-1: 関数 `parseLTSVLog` を記述してください
function parseLTSVLog(logStr) {
  var logs = logStr.split("\n");
  var results = [];
  var labels = ["path", "epoch"];

  // 空白の要素を削除する
  for (var i = 0; i < logs.length; i++) {
    if (logs[i] == "") {
      logs.splice(i, 1);
    }
  }

  logs.forEach(function(logLine) {
    var logUnits = logLine.split("\t");
    var resultTmp = {};

    for (var i=0; i < logUnits.length; i++) {
      var tmp = logUnits[i].split(":");
      var key = tmp[0];
      var value = tmp[1];

      if (labels.indexOf(key) >= 0) {
        resultTmp[key] = value;
      }
    }

    // epoch の値を Int 型にする
    if ("epoch" in resultTmp) {
      resultTmp["epoch"] = parseInt(resultTmp["epoch"]);
    }

    results.push(resultTmp);
  });

  return results;
}

// 課題 JS-2: 関数 `createLogTable` を記述してください
