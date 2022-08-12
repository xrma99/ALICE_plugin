// Script of popup.html

// Set "Preferences" link
var preference_ele = document.getElementById("preference")
let link = "chrome-extension://" + chrome.runtime.id + "/options.html"
preference_ele.setAttribute('href',link)

// popup will exchange data with content-script
// Get the function status (open or close the real-time classification)
let selectNode = document.querySelector('.switch-input')
// Default function status is off
let status = 'off'

//每次都需要先查看用户之前有没有设置过开启/关闭划词翻译功能.使用chrome的storage接口，查看能不能获取到 'switch' 这一项
chrome.storage.sync.get(['switch'], function (result) {
    console.log('Previous:' + result.switch + 'real-time classification')

    //如果之前有把用户的选择存储到chrome的storage中
    if (result.switch === 'on') {
        //增加 checked class 添加 checked的样式(这样就不会在每次刷新页面后选择框的选项都被重置)
        selectNode.classList.add('checked')
    } else {
        selectNode.classList.remove('checked')
    }
});

//监听这个选择框，当值发生变化时触发
selectNode.onclick = function () {
    if (status === 'off') {
        status = 'on'
        selectNode.classList.add('checked')
    } else {
        status = 'off'
        selectNode.classList.remove('checked')
    }

    //通知 content-script.js 用户选择的是开启还是关闭
    //由于chrome浏览器上可能开启了多个窗口&标签页，所以需要先找到currentWindow，和当前活动的网页 active
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        //给当前标签页发送信息（筛选出来的该标签的第一个的id）
        chrome.tabs.sendMessage(tabs[0].id, {switch: status})
    })
}
