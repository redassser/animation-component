var xlen=10;
function animationStep(id) { 
    return new Promise(function(cont, end) {
        const canvas = document.querySelector("i-player").shadowRoot.getElementById(id);
        if(canvas===null || !canvas.getContext) {end({error:"Couldn't get canvas", id:id});}
        
        const ctx = canvas.getContext("2d");
            ctx.fillStyle = "rgb(50,50,50)";
            ctx.fillRect(xlen,10,10,10);
        xlen+=10;
        cont();
    });
}