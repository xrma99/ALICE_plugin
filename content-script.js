// Use 2: Real-time classification panel


// classification constructor function
function Panel() {
    // Instantiate the panel: create a new div element on the page.
    this.create()

    // bind events to the buttons on the panel.
    this.bind()
}

// Create a panel (a div element)
Panel.prototype.create = function () {

    // Create a div element on the page called container.
    let container = document.createElement('div')

    // HTML of the classification panel
    let html = `

    <!--X is the close bottom-->
    <header>ALICE<span class="close">X</span></header>
    <main>
        <div class="source">
            <div class="title">Text</div>
            <!--The text selected by the user to be classified is dynamically inserted, leave it blank here-->
            <div class="content"></div>
        </div>
        <div class="dest">
            <div class="title">Classified to be</div>
            <!--Classification result shows here. 
            Since it is obtained asynchronously, it will be displayed as... before the content is obtained. 
            Otherwise, if the user needs to classify multiple times, here will display the last classification result before the asynchronous acquisition is completed.-->
            <div class="content">...</div>
        </div>
    
        <div class="feedback">
            <div class="question">Do you agree with this classification?</div>
            <span class="yes" id="yes">YES</span>
            <span class="no" id="no">NO</span>
        </div>
    
    </main>    

    `

    container.innerHTML = html

    // give container (outermost layer) a class 'translate-panel'
    container.classList.add('translate-panel')

    // append container to the webpage body
    document.body.appendChild(container)

    // set properties of container to panel member variables
    this.container = container

    // close button
    this.close = container.querySelector('.close')

    // classified text
    this.source = container.querySelector('.source .content')

    // classification result
    this.dest = container.querySelector('.dest .content')

    // feedback buttons
    this.yes = container.querySelector('.yes')
    this.no = container.querySelector('.no')
}

// Show the panel
Panel.prototype.show = function () {
    //container默认没有show这个class,默认样式是opacity:0;css中,如果container同时拥有show class,则opacity:1 取消隐藏
    this.container.classList.add('show')
}

// Hide the panel
Panel.prototype.hide = function () {
    this.container.classList.remove('show')
}


//Panel event functions
Panel.prototype.bind = function () {
    // click close button
    this.close.onclick = () => {
        // hide the panel
        this.hide()
    }

    // click yes feedback button
    this.yes.onclick = () =>{
        console.log("Yes I agree with the result")
        let res = fetch(`http://127.0.0.1:8000/thank/?query=${this.source.innerText}&res=${this.dest.innerText}&feedback=YES`)
        this.hide()
    }

    // click no feedback button
    this.no.onclick = () =>{
        console.log("No I don't agree with the result")
        let res = fetch(`http://127.0.0.1:8000/thank/?query=${this.source.innerText}&res=${this.dest.innerText}&feedback=NO`)
        this.hide()
    }
}

// classify function
// @param: raw - selected text which needs classifying
Panel.prototype.classify = function (raw) {
    // selected text needs to be shown in the panel as well
    this.source.innerText = raw
    // Classification result. As classification is asynchronous, show ... before the result is given
    this.dest.innerText = '...'

    console.log("Start Classification:")

    let mine = fetch(`http://127.0.0.1:8000/results/?q=${raw}`)
              .then(mine=>mine.text())
              .then(mine=>{
                var parser = new DOMParser();
                var doc = parser.parseFromString(mine, 'text/html');
                console.log(doc)

                this.dest.innerText = doc.getElementById('result').value
              })

}

// set panel position on the webpage: it should be near the mouse
Panel.prototype.pos = function (pos) {
    // absolute position
    this.container.style.top = pos.y + 'px'
    this.container.style.left = pos.x + 'px'
}

// Create a panel: global variable (so that only one panel shows on a webpage)
let panel = new Panel()

// Default real-time classification function status is off
let selectState = 'off'

// check chrome storage for 'switch' existence so that users only need to set once instead of every page
chrome.storage.sync.get(['switch'], function (result) {
    // if it exists
    if (result.switch) {
        selectState = result.switch
    }
});

// Listen to see if the popup status changes
chrome.runtime.onMessage.addListener(
    function (request) {
        // If the status changes
        if (request.switch) {
            selectState = request.switch
        }
    });

// Listen for mouse release events
window.onmouseup = function (e) {
    // if the popup shows off, return directly (user disables the real-time classification)
    if (selectState === 'off') return

    // if the popup shows on, process the following.
    // Get the selected text.
    let raw = window.getSelection().toString().trim()

    // Gets the position of the cursor on the page when the mouse is released
    let x = e.pageX
    let y = e.pageY

    if (!raw) { // If nothing is selected, return
        return
    } else {
        // Panel position
        panel.pos({x: x, y: y})
        // Classify the text
        panel.classify(raw)
        // Show it on the webpage
        panel.show()
    }
}