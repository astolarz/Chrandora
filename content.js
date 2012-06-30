function playPause() {
  console.log("playPause()");
  if ($('.playButton').is(':visible')) {
    $('.playButton').click();
  } else {
    $('.pauseButton').click();
  }
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  sendResponse(playPause());
});
