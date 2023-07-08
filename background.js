// Background script code (background.js)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.tabs.executeScript(tabId, { file: 'content.js' });
  }
});
