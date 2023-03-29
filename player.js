const baseTime = 1500;
function handleError(e) {
    console.error(e);
    //TODO: Little box for error / end message
}
async function repeat(id) {
    step(id);
    setTimeout(repeat, baseTime, id)
}
function step(id) {
    animationStep(id).catch(handleError);
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
        //Options Step Button
        const nextbutton = document.createElement("button");
        nextbutton.setAttribute("class","button");
        nextbutton.setAttribute("onClick", `step('${id}')`);
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
        opts.appendChild(playbutton);
        opts.appendChild(nextbutton);
        wrapper.appendChild(opts);
        wrapper.appendChild(screen);

        this.shadowRoot.append(link, wrapper);
    }
}
customElements.define("i-player", IPlayer);
