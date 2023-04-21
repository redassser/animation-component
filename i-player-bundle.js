(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Animated = require("./Animated-class");
class Quiksort extends Animated {
    x;
    i;
    j;
    temp; text;
    constructor(container, id, data) {
      super(container, id);
      const input = data ? data.length : 10;
      this.x = new Uint32Array(input);
      if(data===undefined) {
        this.randomize();
      } 
      this.temp = new Uint32Array([1]);
      this.orig = this.x; // save original state so we can restart and do it again with same data
    }
    make() { // Called immediately opon connecting to DOM (must select here)
      this.svg = d3.select(this.cont.getElementById("svg"+this.id))
        .append("svg").attr("width", "100%").attr("height", "100%");
      this.text = this.svg.append("text")
        .text(this.x.join(" "))
    }
    randomize() {
      for (var i = 0; i < this.x.length; i++)
        x[i] = Math.floor(this.x.length*Math.random());
    }
  
    pickPivot() {
      return this.x[Math.floor(this.x.length*Math.random())];
    }
    // pick a random pivot, and partition into two pieces < pivot and >= pivot
    // using the original quiksort partitioning scheme
    partition(L, R) {
      var pivot = pickPivot();
  
  //   9 8 6 5 4 1 3 2
  //   i             j
  //   2             9
  //
      let i = L, j = R;
      while (i < j) {
        while (i < j && x[i] < pivot) {
          i++;
          this.event1();
        }
        while (i < j && x[j] >= pivot) {
          j--;
          this.event1();
        }
        if (i < j) {
          swap(i,j);
          this.event2();
        }
      }
      return i; // or i+1?
    }
  
    // pick a random pivot, and partition into two pieces < pivot and >= pivot
    // using the original quiksort partitioning scheme
    // 9 8 6 5 4 1 3 2
    // pivot = x[2]
    // 9 8 2 5 4 1 3 6  move pivot out to right
    // i           j
    // 6             9  swap pivot with the one we found x[i]
    // 3 8 2 5 4 1 6 9  swap pivot with x[j]
    //   i              find next bigger element x[i]
    //   6         8    swap with pivot
    //           j      find next smaller x[j]
    // 3 1 2 5 4 6 8 9
    //     i i i i
    // i and j just crossed, so stop
  
    lomutoPartition(L, R) {
      var pivot = pickPivot();
      var pivotLoc = R;
      this.swap(pivot, R); // now pivot is on the far right
      let i = L, j = R-1;
      while (i < j) {
        while (i < j && this.x[i] <= pivot) {
          i++;
        }
        if (i < j) {
          this.swap(i, pivotLoc);
          pivotLoc = i;
        }
        while (i < j && this.x[j] >= pivot) {
          j--;
        }
        if (i < j) {
          this.swap(j, pivotLoc);
          pivotLoc = j;
        }
      }
    }
  
    quicksort(L, R) {
      var i = partition(L,R);
      if (i > L)
        this.quicksort(L, i);
      if (R > i+1)
        this.quicksort(i+1, R);
    }
  
    lomutoQuicksort(L, R) {
      var i = lomutoPartition(L,R); //partition into <= pivot, pivot, >= pivot
      if (i-1 > L)
        this.lomutoQuicksort(L, i-1);
      if (R > i+1)
        this.lomutoQuicksort(i+1, R);
    }
  
    swap() {
      this.temp[0] = this.x[this.i];
      this.x[this.i] = this.x[this.j];
      this.x[this.j] = this.temp[0];
    }
  
    // this shows animation if you want to animate the actual swapping of the elements
    animate1() {
      // show i and j changing
    }
  
    animate2() {
      // show each swap
    }
  
    // this just shows the array itself. I'm proposing to show the array
    render() {
      
    }
}
module.exports = Quiksort;
},{"./Animated-class":2}],2:[function(require,module,exports){
class Animated {
    delayForTransition = 200;
    delayBetweenFrames = 1000;
    intervalID = null;
    id; dom; cont; svg;
    multiplier = 1;
    //custom variables
    xlen = 0;
    load;
  
    constructor(dom, id) {
        this.dom = dom;
        this.cont = dom.shadowRoot;
        this.id = id;
    }
    //Base Functions (must change)
    make() { // Called immediately opon connecting to DOM (must select here)
        this.svg = d3.select(this.cont.getElementById("svg"+this.id))
            .append("svg").attr("width", "100%").attr("height", "100%");
        this.svg.append("rect")
            .attr("x", "10%")
            .attr("y", "40%")
            .attr("width", "80%")
            .attr("height", 20)
            .attr("stroke", "black")
            .attr("fill", "grey");
        this.load = this.svg.append("rect")
            .attr("x", "10%")
            .attr("y", "40%")
            .attr("width", this.xlen+"%")
            .attr("height", 20)
            .attr("fill", "black");
    }
    step(_this = this) { // Called when clicking | Next |.
        return new Promise(function(cont, end) {
            if(_this.xlen>=80) end({error:"End of animation", id:_this.id, end:true})
            else {
                _this.xlen+=10;
                _this.load.attr("width", _this.xlen+"%");
                cont();
            } 
        });
    }
    restart() { // Called when clicking | Restart |.
        this.xlen = -10;
        this.step()
    }
    end() { // Called when clicking | End |.
        this.xlen = 70;
        this.step();
    }
    //Second-order functions (no need to change)
    next(_this = this) {
        _this.step().catch(e=>_this.handleErr(e,_this));
    }
    repeat() {
        this.intervalID = setInterval(this.next, this.delayBetweenFrames/this.multiplier, this);
    }
    stop() {
        clearInterval(this.intervalID); 
        this.intervalID = null;
    }
    nextmultiplier() {
        const multarray = [1,2,4,8]; 
        this.multiplier = multarray[multarray.indexOf(this.multiplier)+1] ?? multarray[0];
        this.cont.getElementById("multbutton").innerHTML = this.multiplier+"x";
    }
    handleErr(e, _this = this) {
        console.error(e);
        _this.cont.lastChild.lastChild.lastChild.innerHTML = e.error;
        setTimeout(()=>_this.cont.lastChild.lastChild.lastChild.innerHTML="",2000)
        if(_this.intervalID != null) { 
            clearInterval(_this.intervalID); 
            _this.intervalID = null;
            _this.dom.intervalCheck();
        }
    }
}
module.exports = Animated;
},{}],3:[function(require,module,exports){
const Animated = require("./player-types/Animated-class");
const Quiksort = require("./player-types/Animated-Quiksort");
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
        // DATA
        const data = this.hasAttribute("data") ? this.getAttribute("data") : undefined;
        //ID / Name attr
        const id = this.hasAttribute("name") ? this.getAttribute("name") : "default";
        if(namearray.includes(id)) {console.error(`i-player with name ${id} already exists`);return;}
        else {namearray.push(id);}
        //Type attr
        const type = this.hasAttribute("type") ? this.getAttribute("type") : "none";
        switch(type) {
            case "quiksort":
                this.animated = new Quiksort(this, id, data);
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

},{"./player-types/Animated-Quiksort":1,"./player-types/Animated-class":2}]},{},[3]);
