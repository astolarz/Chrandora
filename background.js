var isInjected = false;

function findPandora() {
  chrome.tabs.query({"url": "http://www.pandora.com/"}, function(tabs) {
    if(tabs.length > 0) {
      chrome.tabs.executeScript(tabs[0].id, {file: "content.js"}, function() {
        chrome.tabs.sendRequest(tabs[0].id, {}, function(results) {
        });
      });
    }
  });
}

//comment
function test(args) {
  if(!isInjected) {
    chrome.extension.onRequest.addListener(function(tab) {
    });
  }
  console.log("findPandora()");
  findPandora();
}

chrome.browserAction.onClicked.addListener(test);
