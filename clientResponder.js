// install chrandoraListener if not yet installed
if (!window.chrandoraListener) {
  console.log("installing chrandora message listener");
  chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(request.requestType == "isPlaying") {
        var isPlaying = document.getElementsByClassName('playButton')[0].style['display'] != 'none';
        sendResponse(
          {"isPlaying": isPlaying}
          );
      }
    });
  window.chrandoraListener = true; 
 
}
