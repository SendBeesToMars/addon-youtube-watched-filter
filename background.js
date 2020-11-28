chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({"range" : "20"});
  
    // only works on youtube domain
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'www.youtube.com/*', schemes: ["https"]},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });