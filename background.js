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
  pandoraMRU = pandoraMRU.filter(function (e) { return e != tab.id });
  if (tab.url.match('pandora.com')) {
    pandoraMRU.push(tab.id);
  }
}

function tabUpdated(tabId, changeInfo, tab) {
  chrome.tabs.get(tabId, pandoraActivityHandler);
}

function tabActivated(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, pandoraActivityHandler);
}

function tabRemoved(tabId, removeInfo) {
  pandoraMRU = pandoraMRU.filter(function (e) { return e != tabId; });
}

chrome.extension.onMessage.addListener(function(details) {
  togglePandoraState();
});

chrome.browserAction.onClicked.addListener(togglePandoraState);
chrome.tabs.onUpdated.addListener(tabUpdated);
chrome.tabs.onActivated.addListener(tabActivated);
chrome.tabs.onRemoved.addListener(tabRemoved);
