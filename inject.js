function keyListener(e) {
  if (e.ctrlKey && e.keyCode) {
    if (e.keyCode == 220 || e.keyCode == 191 || (e.altKey && e.keyCode == 80)) {
      chrome.extension.sendMessage("key binding");
    }
  }
}

window.addEventListener("keyup", keyListener, false);
