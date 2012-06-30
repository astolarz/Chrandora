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

var isInjected = false;

function findPandora() {
	chrome.tabs.query({"url": "*.pandora.com/*"}, function(tabs) {
    console.log("test "+ tabs.length);
		if(tabs.length > 0) {
      console.log("test 2");
		  console.log("size: " + tabs.length + " " + tabs[0]);
		}
	});
}

function test() {
	if(!isInjected) {
		chrome.extension.onRequest.addListener(function(tab) {
		});
	}
  console.log("findPandora()");
  findPandora();
}

chrome.browserAction.onClicked.addListener(test);
