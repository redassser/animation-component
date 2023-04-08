const baseTime = 1500;
var namearray = [];
//HTML for player
class IPlayer extends HTMLElement { 
    constructor() {
        super();
        this.animated;
        this.mult = 1;
    } 
    intervalCheck() {
        const dis = this.shadowRoot.lastChild.firstChild.children;
        if(this.animated.intervalID===null) { // Not Playing
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
    connectedCallback() {
        this.attachShadow({mode:"open"});
        //CSS
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "playerstyle.css");
        //ID / Name attr
        const id = this.hasAttribute("name") ? this.getAttribute("name") : "default";
        if(namearray.includes(id)) {console.error(`i-player with name ${id} already exists`);return;}
        else {namearray.push(id);}
        //Type attr
        const type = this.hasAttribute("type") ? this.getAttribute("type") : "none";
        switch(type) {
            case "quiksort":
                //this.animated = new Quiksort(this.shadowRoot);
                break;
            case "example":
            default:
                this.animated = new Animated(this, id);
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
            this.animated.restart();
        }
        restartbutton.innerHTML = "Restart";
        //Options Stop Button
        const stopbutton = document.createElement("button");
        stopbutton.setAttribute("class","button");
        stopbutton.onclick = () => {
            this.animated.stop();
            this.intervalCheck();
        }
        stopbutton.innerHTML = "Stop";
        //Options Step Button
        const nextbutton = document.createElement("button");
        nextbutton.setAttribute("class","button");
        nextbutton.onclick = () => {
            this.animated.next();
        }
        nextbutton.innerHTML = "Next";
        //Options Play Button
        const playbutton = document.createElement("button");
        playbutton.setAttribute("class","button");
        playbutton.onclick = async () => {
            this.animated.repeat();
            this.intervalCheck();
        }
        playbutton.id = "repeatbutton";
        playbutton.innerHTML = "Play";
        //Options Multiplier Button
        const multbutton = document.createElement("button");
        multbutton.setAttribute("class","button");
        multbutton.onclick = () => {
            this.animated.nextmultiplier();
        }
        multbutton.id = "multbutton";
        multbutton.innerHTML = "1x";
        //Options End Button
        const endbutton = document.createElement("button");
        endbutton.setAttribute("class","button");
        endbutton.onclick = () => {
            this.animated.end();
        }
        endbutton.id = "endbutton";
        endbutton.innerHTML = "End";
        //Screen
        const screen = document.createElement("div");
        screen.setAttribute("class", "screen");
        screen.id = "svg"+id;
        
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
        this.animated.make();
        this.intervalCheck();
    }
      
}
customElements.define("i-player", IPlayer);
