// 課題 JS-1: 関数 `parseLTSVLog` を記述してください
function parseLTSVLog(logStr) {
  var logs = logStr.split("\n");
  var results = [];
  var labels = ["path", "epoch"];
  var i;

  // 空白の要素を削除する
  for (i = 0; i < logs.length; i++) {
    if (logs[i].match(/(^\s+$|^$)/)) {
      logs.splice(i, 1);
    }
  }

  logs.forEach(function(logLine) {
    var logUnits = logLine.split("\t");
    var resultTmp = {};

    for (i = 0; i < logUnits.length; i++) {
      var tmp = logUnits[i].split(":");
      var key = tmp[0];
      var value = tmp[1];

      resultTmp[key] = value;
    }

    // epoch の値を Int 型にする
    if ("epoch" in resultTmp) {
      resultTmp.epoch = parseInt(resultTmp.epoch);
    }

    results.push(resultTmp);
  });

  return results;
}

// 課題 JS-2: 関数 `createLogTable` を記述してください

function createLogTable(containerNode, logObjs) {
  var tableNode = document.createElement("table");
  var theadNode = document.createElement("thead");
  var tbodyNode = document.createElement("tbody");
  var trNode, logKey;

  // thead 部の生成

  trNode = document.createElement("tr");
  for (logKey in logObjs[0]) {
    var thNode = document.createElement("th");
    thNode.appendChild((document.createTextNode(logKey)));
    trNode.appendChild(thNode);
  }

  theadNode.appendChild(trNode);
  tableNode.appendChild(theadNode);

  // tbody 部の生成

  for (var i = 0; i < logObjs.length; i++) {
    trNode = document.createElement("tr");
    for (logKey in logObjs[i]) {
      var tdNode = document.createElement("td");
      tdNode.appendChild(document.createTextNode(logObjs[i][logKey]));
      trNode.appendChild(tdNode);
    }

    tbodyNode.appendChild(trNode);
  }

  tableNode.appendChild(tbodyNode);

  containerNode.appendChild(tableNode);
}
