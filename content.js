function isVisible(element) {
  return element.style['display'] != 'none';
}

playButton = document.getElementsByClassName('playButton')[0];
pauseButton = document.getElementsByClassName('pauseButton')[0];

if (isVisible(playButton)) {
  playButton.click();
} else {
  pauseButton.click();
}
