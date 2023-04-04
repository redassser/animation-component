const baseTime = 1500;
var namearray = [];
//HTML for player
class IPlayer extends HTMLElement {  
    constructor() {
        super();
        this.func; 
        this.id;
        this.mult = 1;
        this.intervalID = null;
    }
    //Base Step functions and single function (promise) to change
    next() {
        if(this.intervalID === null)
            this.step();
    }
    repeat() {
        if(this.intervalID === null)
        this.intervalID = setInterval(this.step, baseTime/this.mult, this);
    }
    stop() {
        if(this.intervalID != null) {
            clearInterval(this.intervalID); 
            this.intervalID = null;
        }
    }
    step(_this = this) { 
        _this.func(_this.id).catch(e=>_this.handleErr(e,_this.intervalID)); 
    }
    
    nextmult() {
        const multarray = [1,2,4,8]; 
        this.mult = multarray[multarray.indexOf(this.mult)+1] ?? multarray[0];
        this.shadowRoot.getElementById("multbutton").innerHTML = this.mult+"x";
    }
    intervalCheck() {
        const dis = this.shadowRoot.lastChild.firstChild.children;
        if(this.intervalID===null) {
            dis[1].disabled = true;
            dis[2].disabled = false;
            dis[3].disabled = false;
            dis[4].disabled = false;
        } else {
            dis[1].disabled = false;
            dis[2].disabled = true;
            dis[3].disabled = true;
            dis[4].disabled = true;
        }
    }
    handleErr(e, _intervalID = this.intervalID) {
        console.error(e);
        //TODO: Add little box to show errors / end messages
        if(_intervalID != null) { 
            clearInterval(_intervalID); 
            _intervalID = null;
        }
    }
    connectedCallback() {
        this.attachShadow({mode:"open"});
        //CSS
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "playerstyle.css");
        //ID / Name attr
        this.id = this.hasAttribute("name") ? this.getAttribute("name") : "default";
        if(namearray.includes(this.id)) {console.error(`i-player with name ${this.id} already exists`);return;}
        else {namearray.push(this.id);}
        //Type attr
        const type = this.hasAttribute("type") ? this.getAttribute("type") : "none";
        //TODO: ADD MORE ANIMATIONS
        switch(type) {
            case "example":
            default:
                this.func = exampleAnimationStep;
                break;
        }
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
        stopbutton.onclick = () => {
            this.stop();
            this.intervalCheck();
        }
        stopbutton.innerHTML = "Stop";
        //Options Step Button
        const nextbutton = document.createElement("button");
        nextbutton.setAttribute("class","button");
        nextbutton.onclick = () => {
            this.next();
            this.intervalCheck();
        }
        nextbutton.innerHTML = "Next";
        //Options Play Button
        const playbutton = document.createElement("button");
        playbutton.setAttribute("class","button");
        playbutton.onclick = () => {
            this.repeat();
            this.intervalCheck();
        }
        playbutton.id = "repeatbutton";
        playbutton.innerHTML = "Play";
        //Options Multiplier Button
        const multbutton = document.createElement("button");
        multbutton.setAttribute("class","button");
        multbutton.onclick = () => {
            this.nextmult();
            this.intervalCheck();
        }
        multbutton.id = "multbutton";
        multbutton.innerHTML = "1x";
        //Screen
        const screen = document.createElement("canvas");
        screen.setAttribute("class", "screen");
        screen.id = this.id;
        
        //Add Children
        opts.appendChild(restartbutton);
        opts.appendChild(stopbutton);
        opts.appendChild(playbutton);
        opts.appendChild(multbutton);
        opts.appendChild(nextbutton);
        wrapper.appendChild(opts);
        wrapper.appendChild(screen);
        this.shadowRoot.append(link, wrapper);
        this.intervalCheck()
    }
      
}
customElements.define("i-player", IPlayer);
