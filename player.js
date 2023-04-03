const baseTime = 1500;
var intervalIDobj = {};
var namearray = ["default"]

function handleErr(e, id) {
    console.error(e);
    //TODO: Add little box to show errors / end messages
    if(intervalIDobj[id]) { 
        clearInterval(intervalIDobj[id]); 
        delete intervalIDobj[id]; 
    }
}
function repeat(id, mult) {
    if(!intervalIDobj[id]) {
        intervalIDobj[id] = setInterval(step, baseTime/mult, id);
    }
}
function stop(id) {
    if(intervalIDobj[id]) {
        clearInterval(intervalIDobj[id]); 
        delete intervalIDobj[id]; 
    }
}
function next(id) {
    if(intervalIDobj[id]) {
        step(id);
    }
}

//Base Step functions and single function (promise) to change
function step(id) {
    animationStep(id).catch(e=>handleErr(e,id)); 
}
//Mult and html changing
function nextmult(id, current) {
    const multarray = [1,2,4,8]; 
    const elem = document.querySelector(`i-player[name='${id}']`).shadowRoot;
    const multiplier = multarray[multarray.indexOf(current)+1] ?? multarray[0];
    elem.getElementById("multbutton").setAttribute("onClick", `nextmult('${id}',${multiplier})`);
    elem.getElementById("multbutton").innerHTML = multiplier+"x";
    elem.getElementById("repeatbutton").setAttribute("onClick", `repeat('${id}', ${multiplier})`);
}

//HTML for player
class IPlayer extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.attachShadow({mode:"open"});
        //CSS
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "playerstyle.css");
        //ID attr
        const id = this.hasAttribute("name") ? this.getAttribute("name") : "default";
        if(namearray.includes(id)) {console.error(`i-player with name ${id} already exists`);return;}
        else {namearray.push(id);}
        //Wrapper
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "wrapper");
        //Options Footer
        const opts = document.createElement("div");
        opts.setAttribute("class", "options");
        //Options restart Button
        const restartbutton = document.createElement("button");
        restartbutton.setAttribute("class","button");
        restartbutton.setAttribute("onClick", "window.location.reload()");
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
        //Options Play Button
        const playbutton = document.createElement("button");
        playbutton.setAttribute("class","button");
        playbutton.setAttribute("onClick", `repeat('${id}', 1)`);
        playbutton.setAttribute("id","repeatbutton");
        playbutton.innerHTML = "Play";
        //Options Multiplier Button
        const multbutton = document.createElement("button");
        multbutton.setAttribute("class","button");
        multbutton.setAttribute("id","multbutton");
        multbutton.setAttribute("onClick", `nextmult('${id}',1)`)
        multbutton.innerHTML = "1x";
        //Screen
        const screen = document.createElement("canvas");
        screen.setAttribute("class", "screen");
        screen.id = id;
        
        //Add Children
        opts.appendChild(restartbutton);
        opts.appendChild(stopbutton);
        opts.appendChild(playbutton);
        opts.appendChild(multbutton);
        opts.appendChild(nextbutton);
        wrapper.appendChild(opts);
        wrapper.appendChild(screen);

        this.shadowRoot.append(link, wrapper);
    }
      
}
customElements.define("i-player", IPlayer);
