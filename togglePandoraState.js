function startPlayingLastTab() {
  var lastTab = pandoraMRU.pop();
  chrome.tabs.executeScript(
    lastTab,
    {file: "content.js"});
}

function processResponses(responseMap) {
  var isPlaying = false;
  var curTabPlaying = null;   // the tab id of the tab currently playing
  // calculate if any tab is playing
  $.each(responseMap, function(indx, tabResponse) {
    if(tabResponse.isPlaying) {
      isPlaying = true;
      curTabPlaying = tabResponse.tabId;
    }
  });
  if (isPlaying) {
    chrome.tabs.executeScript(
      curTabPlaying,
      {file: "content.js"},
      function() {
        pandoraMRU.push(curTabPlaying);
      });
  } else {
    // nothing playing, Play the most recently viewed Pandora tab
    startPlayingLastTab();
  }
}

// Each tab will send its response to an extensionResponder object
// So we can synchronize the responses
var extensionResponder = function() {
  var classDef = {};

  var impl = function(numTabs) {
    this.numTabsWaitingFor = numTabs;
    this.tabResponses = {};
  };
  impl.prototype.checkInTabState = function(args) {
    var thisResponder = this;   // allows access to 'this' inside closure
    // args:
    //  tabId : integer
    //  isPlaying: boolean
    this.tabResponses[args.tabId] = args;
    this.numTabsWaitingFor -= 1;
    if (this.numTabsWaitingFor == 0) {
      // All tabs have checked in. keep going
      processResponses(this.tabResponses);
    }
  };
  classDef.createNew = function(numTabs) {
    return new impl(numTabs);
  };
  return classDef;
}();

function togglePandoraState() {
  chrome.tabs.query({"url":"*://*.pandora.com/*"}, function(tabs) {
    if (!tabs.length) {
      return;
    }
    var responder = extensionResponder.createNew(tabs.length);
    // find if any tab is currently playing
    $.each(tabs, function(indx, tab) {
      var curTabPlaying = false;
      // install the chrandora message listener on each tab
      chrome.tabs.executeScript(
        tab.id,
        {"file":"clientResponder.js"},
        function() {
           chrome.tabs.sendMessage(
             tab.id,
             {"requestType":"isPlaying"},
             function(response) {
               responder.checkInTabState({
                 "tabId": tab.id,
                 "isPlaying": response.isPlaying
               });
             }
           );
        });
    });
  });
}
