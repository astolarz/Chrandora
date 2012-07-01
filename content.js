function isVisible(element) {
  return element.style['display'] != 'none';
}

var playButton = document.getElementsByClassName('playButton')[0];
var pauseButton = document.getElementsByClassName('pauseButton')[0];

if (isVisible(playButton)) {
  playButton.click();
} else {
  pauseButton.click();
}
