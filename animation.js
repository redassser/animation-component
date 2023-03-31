var xlen=10; var first = false;
function animationStep(id) { 
    return new Promise(function(cont, end) {
        const canvas = document.querySelector(`i-player[name='${id}']`).shadowRoot.getElementById(id);
        if(canvas===null || !canvas.getContext) {end({error:"Couldn't get canvas", id:id, end:false});}
        else if(xlen>250) end({error:"End of animation", id:id, end:true})
        else {
            const ctx = canvas.getContext("2d");
                ctx.fillStyle = "rgb(50,50,50)";
                ctx.fillRect(xlen,10,10,10);
                if(first==false) {
                    ctx.strokeText("Loading...",10,30);
                    ctx.beginPath();
                    ctx.rect(10,10,250,10);
                    ctx.stroke();
                    first=true;
                } 
            xlen+=10;
            cont();
        }   
    });
}