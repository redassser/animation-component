const baseTime = 1500;
var namearray = [];
//HTML for player
class IPlayer extends HTMLElement {  
    constructor() {
        super();
        this.func; this.restart; this.end;
        this.id;
        this.mult = 1;
        this.intervalID = null;
    }
    //Base Step functions and single function (promise) to change
    next() {
        if(this.intervalID === null)
            this.step();
    }
    restartnow() {
        if(this.intervalID === null) 
            this.restart(this.id);
    }
    endnow() {
        if(this.intervalID === null)
            this.end(this.id);
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
        _this.func(_this.id).catch(e=>_this.handleErr(e,_this)); 
    }
    
    nextmult() {
        const multarray = [1,2,4,8]; 
        this.mult = multarray[multarray.indexOf(this.mult)+1] ?? multarray[0];
        this.shadowRoot.getElementById("multbutton").innerHTML = this.mult+"x";
    }
    intervalCheck(_this = this) {
        const dis = _this.shadowRoot.lastChild.firstChild.children;
        if(_this.intervalID===null) { // Not Playing
            dis[0].disabled = false;
            dis[1].disabled = true;
            dis[2].disabled = false;
            dis[3].disabled = false;
            dis[4].disabled = false;
            dis[5].disabled = false;
        } else { // Playing
            dis[0].disabled = true;
            dis[1].disabled = false;
            dis[2].disabled = true;
            dis[3].disabled = true;
            dis[4].disabled = true;
            dis[5].disabled = true;
        }
    }
    handleErr(e, _this = this) {
        console.error(e);
        _this.shadowRoot.lastChild.lastChild.lastChild.innerHTML = e.error;
        setTimeout(()=>_this.shadowRoot.lastChild.lastChild.lastChild.innerHTML="",2000)
        if(_this.intervalID != null) { 
            clearInterval(_this.intervalID); 
            _this.intervalID = null;
            _this.intervalCheck();
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
                this.restart = exampleAnimationRestart;
                this.end = exampleAnimationEnd;
                break;
        }
        //Wrapper
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "wrapper");
        //Message
        const messagewrap = document.createElement("div")
        messagewrap.setAttribute("class", "messagewrap")
        const message = document.createElement("div");
        message.setAttribute("class", "message")
        message.innerHTML = ""
        //Options Footer
        const opts = document.createElement("div");
        opts.setAttribute("class", "options");
        //Options restart Button
        const restartbutton = document.createElement("button");
        restartbutton.setAttribute("class","button");
        restartbutton.onclick = () => {
            this.restartnow();
        }
        restartbutton.innerHTML = "Restart";
        //Options Stop Button
        const stopbutton = document.createElement("button");
        stopbutton.setAttribute("class","button");
        stopbutton.onclick = () => {
            this.stop();
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
        }
        multbutton.id = "multbutton";
        multbutton.innerHTML = "1x";
        //Options End Button
        const endbutton = document.createElement("button");
        endbutton.setAttribute("class","button");
        endbutton.onclick = () => {
            this.endnow();
        }
        endbutton.id = "endbutton";
        endbutton.innerHTML = "End";
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
        opts.appendChild(endbutton);
        messagewrap.appendChild(message);
        wrapper.appendChild(opts);
        wrapper.appendChild(screen);
        wrapper.appendChild(messagewrap);
        this.shadowRoot.append(link, wrapper);
        this.intervalCheck();
        this.restartnow();
    }
      
}
customElements.define("i-player", IPlayer);
