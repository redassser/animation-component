var state = 0; //Initial State
function handleError(e) {
    console.error(e.error);
}
async function step() {
    state = await animationStep(state).catch(handleError);
    if(state!=undefined) {
        document.getElementById("test").innerHTML = state;
    }
}