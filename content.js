console.log("playPause()");
if(document.getElementsByClassName('playButton')[0].firstChild.click() == undefined) {
  console.log('inside');
  document.getElementsByClassName('pauseButton')[0].firstChild.click();
}
console.log('after');
