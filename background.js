function playPause() {
  chrome.tabs.query({"url": "*://*.pandora.com/*"}, function(tabs) {
    if (tabs.length > 0) {
      chrome.tabs.executeScript(tabs[0].id, {file: "content.js"});
    }
  });
}

// Stack of tabIds of Pandora tabs in order of usage.
// These should be checked again before use.
var pandoraMRU = [];

function pandoraActivityHandler(tab) {
  if (tab.url.match('pandora.com')) {
    pandoraMRU = pandoraMRU.filter(function (e) { return e != tab.id });
    pandoraMRU.push(tab.id);
  }
}

function tabUpdated(tabId, changeInfo, tab) {
  chrome.tabs.get(tabId, pandoraActivityHandler);
}

function tabActivated(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, pandoraActivityHandler);
}

chrome.extension.onMessage.addListener(function(details) {
  playPause();
  console.log("caught key binding");
});

chrome.browserAction.onClicked.addListener(playPause);
chrome.tabs.onUpdated.addListener(tabUpdated);
chrome.tabs.onActivated.addListener(tabActivated);
