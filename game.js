/*
Hi
This is the code for a game
Work started 7th Sept 2024

Game is about catching a goose with a box

*/

// declare variables
const resetBtn = document.querySelector(".reset");
const goose = document.getElementById("hero");

let score = 0;
let xGoose = 20;
let yGoose = 90;
const stepSize = 5;
let walkingState = 1;
let dx = dy = 0;

const treat = {
    x: 300,
    y: 300,
}


// initialise game
let canvas = document.getElementById("game");
let context = canvas.getContext('2d');

canvas.style.width = (window.innerWidth-20)+"px";
canvas.style.height = (window.innerHeight-200)+"px";

goose.style.left = "20px";
goose.style.top = "90px";


document.getElementById("score").innerHTML = "Score: " + score;

// buttons
resetBtn.addEventListener("click", resetGoose);





// move functions
function stepLeft(){
    if (xGoose<20){
        xGoose = window.innerWidth;
    } else {
        xGoose -= stepSize;
        
    }
    goose.style.left = xGoose + "px";
    goose.src = "images/goose.png";
}
function stepRight() {
    if (xGoose > (window.innerWidth-50)) {
        xGoose = 0;
    } else {
        xGoose += stepSize;
    }
    goose.style.left = xGoose + "px";
    goose.src = "images/rightWalk1.png";
}
function stepDown() {
    if (yGoose> window.innerHeight-180) {
        yGoose = 80;
    } else {
        yGoose += stepSize;
    }
    goose.style.top = yGoose + "px";
    goose.src = "images/downWalk1.png";

}
function stepUp() {
    if (yGoose < 90) {
        yGoose = window.innerHeight-180;
    } else {
        yGoose -= stepSize;
    }
    goose.style.top = yGoose + "px";
    goose.src = "images/upWalk1.png";
}


// gameplay
function resetGoose() {
    xGoose = 20;
    yGoose = 90;
    dx = dy = 0;
    score = 0;
    goose.style.left = xGoose + "px";
    goose.style.top = yGoose + "px";
    console.log("Position reset");
}


function createTreat() {
    
    
}

// main loop
function loop() {
    requestAnimationFrame(loop);

    // make the goose walk by velocity
    if (dx==-1){
        stepLeft();
    } else if (dx==1){
        stepRight();
    }

    if (dy==-1){
        stepUp();
    } else if (dy==1){
        stepDown();
    }

    // check for collision with treat
    // eat treat, increment score
    // create new treat


}

function incrementScore() {
    score++;
    console.log("The score is "+score);
    document.getElementById("score").innerHTML = "Score: " + score;
}


// listen for steps
document.addEventListener('keydown', function(e) {
    if(e.which === 37) {
        console.log('Left was pressed');
        dy=0;
        dx = -1;
        

    }
    else if(e.which === 39) {
        console.log('Right was pressed');
        dx = 1;
        dy = 0;
        
    }
    else if(e.which === 38) {
        console.log('Up was pressed');
        dy = -1;
        dx = 0;
        incrementScore();
    }
    else if(e.which == 40) {
        console.log('Down was pressed');
        dy = 1;
        dx = 0;
    }
});


// execute game
requestAnimationFrame(loop);










