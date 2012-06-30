// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.extension.onRequest.addListener(function(request, sender, callback) {
		var tabId = request.tabId;
		chrome.tabs.executeScript(tabId, { file: "content.js" }, function() {
			chrome.tabs.sendRequest(tabId, {}, function(results) {
				validateLinks(results, callback);
			});
		});
	});
}
