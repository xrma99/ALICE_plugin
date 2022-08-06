// Use 1: Right click and jump to the server
// Plugin backend, running 24/7

// When the user select text and right click, there would be a plugin icon
chrome.runtime.onInstalled.addListener(function() {
// Create an entry to the context menu shown after selecting some text and right-clicking the webpage
    chrome.contextMenus.create({
        "id": "Classification",
        // title: what will be shown in the context menu
        "title": "Classify %s",
        // Only when selecting some text, would title appear
        "contexts": ["selection"]
    });
});

// When the plugin icon is clicked, it will jump to a new tab showing classification results.
chrome.contextMenus.onClicked.addListener(function(info) {
    // if user click the plug-in entry in the context menu (id equals to line_8)
    if (info.menuItemId === 'Classification') {
        //Open a new tab redirecting to the classification result page of the web server

        // let t = info.selectionText.replace(/\s/g,"+");
        chrome.tabs.create({url: `http://127.0.0.1:8000/results/?q=${info.selectionText}`})
    }
})