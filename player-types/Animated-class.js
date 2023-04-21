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