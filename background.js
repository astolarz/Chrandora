function playPause(args) {
  chrome.tabs.query({"url": "*://*.pandora.com/*"}, function(tabs) {
    if (tabs.length > 0) {
      chrome.tabs.executeScript(tabs[0].id, {file: "content.js"});
    }
  });
}

var pandoraTabs = []

function tabUpdatedCallback(tabId, changeInfo, tab) {
  console.log(tab)
}

function tabCreatedCallback(tab) {
  chrome.tabs.onUpdated.addListener(tabUpdatedCallback);
}

chrome.browserAction.onClicked.addListener(togglePandoraState);
chrome.tabs.onCreated.addListener(tabCreatedCallback);
