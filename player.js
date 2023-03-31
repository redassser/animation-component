const baseTime = 1500;
var intervalID = null;

function handleErr(e) {
    console.error(e);
    //TODO: Add little box to show errors / end messages
    if(intervalID!=null) { 
        clearInterval(intervalID); 
        intervalID = null; 
    }
}
function repeat(id) {
    if(intervalID === null) {
        intervalID = setInterval(step, baseTime, id);
    }
}
function stop(id) {
    if(intervalID != null) {
        clearInterval(intervalID); 
        intervalID = null;
    }
}
function next(id) {
    if(intervalID === null) {
        step(id);
    }
}

//Base Step functions and single function (promise) to change
function step(id) {
    animationStep(id).catch(handleErr); 
}

//HTML for player
class IPlayer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:"open"});
        //CSS
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "playerstyle.css");
        //ID attr
        const id = this.hasAttribute("name") ? this.getAttribute("name") : "def";
        //Wrapper
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "wrapper");
        //Options Footer
        const opts = document.createElement("div");
        opts.setAttribute("class", "options");
        //Options restart Button
        const restartbutton = document.createElement("button");
        restartbutton.setAttribute("class","button");
        restartbutton.setAttribute("onClick", `step('${id}')`);
        restartbutton.innerHTML = "Restart";
        //Options Stop Button
        const stopbutton = document.createElement("button");
        stopbutton.setAttribute("class","button");
        stopbutton.setAttribute("onClick", `stop('${id}')`);
        stopbutton.innerHTML = "Stop";
        //Options Step Button
        const nextbutton = document.createElement("button");
        nextbutton.setAttribute("class","button");
        nextbutton.setAttribute("onClick", `next('${id}')`);
        nextbutton.innerHTML = "Next";
        //Options play Button
        const playbutton = document.createElement("button");
        playbutton.setAttribute("class","button");
        playbutton.setAttribute("onClick", `repeat('${id}')`);
        playbutton.innerHTML = "Play";
        //Screen
        const screen = document.createElement("canvas");
        screen.setAttribute("class", "screen");
        screen.id = id;
        
        //Add Children
        opts.appendChild(restartbutton);
        opts.appendChild(stopbutton);
        opts.appendChild(playbutton);
        opts.appendChild(nextbutton);
        wrapper.appendChild(opts);
        wrapper.appendChild(screen);

        this.shadowRoot.append(link, wrapper);
    }
}
customElements.define("i-player", IPlayer);
