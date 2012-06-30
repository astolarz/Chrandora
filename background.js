/*chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("background.js");
  chrome.extension.onRequest.addListener(function(request, sender, callback) {
    var tabId = request.tabId;
    chrome.tabs.executeScript(tabId, { file: "content.js" }, function() {
      chrome.tabs.sendRequest(tabId, {}, function(results) {
        validateLinks(results, callback);
      });
    });
  });
});*/

document.write('<script src="jquery.min.js"' +
    'type="text/javascript"><\/script>')

var isInjected = false;

function findPandora() {
  chrome.tabs.query({"url": "http://www.pandora.com/"}, function(tabs) {
    console.log("test "+ tabs.length);
    if(tabs.length > 0) {
      console.log("test b");
      console.log("size: " + tabs.length + " " + tabs[0]);
      chrome.tabs.executeScript(tabs[0].id, {file: "content.js"}, function() {
        console.log("inject");
        chrome.tabs.sendRequest(tabs[0].id, {}, function(results) {
          jQuery('.playButton').toggle();
        });
      });
    }
  });
}

function test(args) {
  if(!isInjected) {
    chrome.extension.onRequest.addListener(function(tab) {
    });
  }
  console.log("findPandora()");
  findPandora();
}

chrome.browserAction.onClicked.addListener(test);
