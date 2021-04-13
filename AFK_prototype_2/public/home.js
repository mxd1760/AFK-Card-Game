let start = document.querySelector('#play');

function buttonPressed(e) {
    console.log("the button was pressed!");
    setTimeout(()=>{
        // send the user to a game
        //window.location.replace("localhost:3000/game")
    },2000);

}

start.addEventListener("click", buttonPressed);
