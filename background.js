function playPause(args) {
  chrome.tabs.query({"url": "*://*.pandora.com/*"}, function(tabs) {
    if (tabs.length > 0) {
      chrome.tabs.executeScript(tabs[0].id, {file: "content.js"});
    }
  });
}

chrome.browserAction.onClicked.addListener(playPause);
