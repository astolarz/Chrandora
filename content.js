function playPause() {
	console.log("playPause()");
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  sendResponse(playPause());
});
