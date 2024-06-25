// Listen for when a tab is activated (switched to)
chrome.tabs.onActivated.addListener(activeInfo => {
    // Query for the current active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Send a message to the content script running in the active tab
        chrome.tabs.sendMessage(tabs[0].id, { action: "playVideo" });
    });
});

// Listen for updates to any tab that might indicate a tab loading is complete
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the tab update is indicating a 'complete' state and the tab is active
    if (changeInfo.status === 'complete' && tab.active) {
        // Send a message to the content script in the tab to play the video
        chrome.tabs.sendMessage(tabId, { action: "playVideo" });
    }
});

// Function to pause the video in the current tab
function pauseVideo() {
    // Send a message to the current tab's content script to pause the video
    chrome.tabs.sendMessage(tab.id, { action: "pauseVideo" });
}
