var switchToTab = function (tab){
    var tabId = tab.id;
    chrome.tabs.update(tabId, {active: true});
    return this.getTabInfo(tabId).then(function(tab) {
        if (tab) chrome.windows.update(tab.windowId, {focused: true});
    });
}

var switchToTabNum = function (num){
    chrome.tabs.query({}, function (tabs){
        if (num == -1) {
            switchToTab(tabs.pop());
        } else {
            switchToTab(tabs[num-1]);
        }
    });
}

chrome.commands.onCommand.addListener(function(command) {
    if (command == 'to-eighth-tab'){
        switchToTabNum(8);
    }
});
