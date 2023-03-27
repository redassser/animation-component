function animationStep(state) { 
    return new Promise(function(cont, end) {
        if(state>3 || state===undefined) end({error:"No more steps",state:state});
        else {
            state+=1;
            cont(state);
        }
    });
}