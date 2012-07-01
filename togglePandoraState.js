function togglePandoraState() {
  chrome.tabs.query({"url":"*://*.pandora.com/*"}, function(tabs) {
    if (!tabs.length) {
      console.log("Did not find any pandora tabs");
      return;
    }
    console.log("found "+tabs.length+" pandora tabs");
    var curPlaying = false;
    var activeTab = null;
    // find if any tab is currently playing
    $.each(tabs, function(indx, tab) {
      // install the chrandora message listener on each tab
      chrome.tabs.executeScript(tab.id, {"file":"clientResponder.js"});
    });
  });
}
