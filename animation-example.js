var xlen={}, first={};
//All variables must be initialized as objects and include the player ID to individualize
function exampleAnimationStep(id) { 
    return new Promise(function(cont, end) {
        const canvas = document.querySelector(`i-player[name='${id}']`);
        if(canvas===null) {end({error:"Couldn't get canvas", id:id, end:false});}
        else if(xlen[id]>250) end({error:"End of animation", id:id, end:true})
        else {
            const ctx = canvas.shadowRoot.getElementById(id).getContext("2d");
                if(!first[id]) {
                    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
                    ctx.strokeStyle = "rgb(250,250,250)";
                    ctx.strokeText("Loading...",10,30);
                    ctx.beginPath();
                    ctx.rect(10,10,250,10);
                    ctx.stroke();
                    first[id]=true;
                    xlen[id]=10;
                } 
                ctx.fillStyle = "rgb(250,250,250)";
                ctx.fillRect(xlen[id],10,10,10);
            xlen[id]+=10;
            cont();
        }   
    });
}
function exampleAnimationRestart(id) {
    first[id]=false; xlen[id]=0;
    exampleAnimationStep(id).catch(console.error);
}
function exampleAnimationEnd(id) {
    while(xlen[id]<=250) 
        exampleAnimationStep(id).catch(console.error);
}