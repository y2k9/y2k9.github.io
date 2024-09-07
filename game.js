/*
Hi
This is the code for a game
Work started 7th Sept 2024

Game is about catching a goose with a box

*/

// declare variables
const startBtn = document.querySelector(".start");
const endBtn = document.querySelector(".end");
const resetBtn = document.querySelector(".reset");
const goose = document.getElementById("hero");

let score = 0;
let xGoose = 10;
let yGoose = 90;
const stepSize = 5;
let walkingState = 1;
let dx = dy = 0;


const treat = {
    x: 300,
    y: 300,
}



let canvas = document.getElementById("game");
let context = canvas.getContext('2d');

canvas.style.width = (window.innerWidth-20)+"px";
canvas.style.height = (window.innerHeight-200)+"px";

/*
const ctx = document.getElementById("canvas").getContext("2d");
const goose = new Image();

img.addEventListener("load", () => {
  ctx.drawImage(img, 0, 0);
});

goose.src = "images/rightWalk1.png";
*/

document.getElementById("score").innerHTML = "Score: " + score;

// buttons

startBtn.addEventListener("click", changeToRed);
endBtn.addEventListener("click", changeItBack);
resetBtn.addEventListener("click", resetGoose);


// define functions
function changeToRed() {
    document.getElementById("gamename").style.color = "red";
    score++;
    document.getElementById("score").innerHTML = "Score: " + score;
}

function changeItBack() {
    document.getElementById("gamename").style.color = "#2b1e30";
}

function stepLeft(){
    if (xGoose<0){
        xGoose = window.innerWidth;
    } else {
        xGoose -= stepSize;
        
    }
    goose.style.left = xGoose + "px";
    goose.src = "images/goose.png";
}

function stepRight() {
    if (xGoose> window.innerWidth-goose.width) {
        xGoose = 0;
    } else {
        xGoose += stepSize;
    }
    goose.style.left = xGoose + "px";
    goose.src = "images/rightWalk1.png";
}

function stepDown() {
    if (yGoose> window.innerHeight-goose.width) {
        yGoose = 0;
    } else {
        yGoose += stepSize;
    }
    goose.style.top = yGoose + "px";

}

function stepUp() {
    if (yGoose < goose.width) {
        yGoose = window.innerHeight;
    } else {
        yGoose -= stepSize;
    }
    goose.style.top = yGoose + "px";
}

function resetGoose() {
    xGoose = 10;
    yGoose = 80;
    dx = dy = 0;
    goose.style.left = xGoose + "px";
    goose.style.top = yGoose + "px";
    console.log("Position reset");
}


function createTreat() {
    
}


function loop() {
    requestAnimationFrame(loop);

    // make the goose walk by velocity
    console.log("game loop");
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
    }
    else if(e.which == 40) {
        console.log('Down was pressed');
        dy = 1;
        dx = 0;
    }
});

requestAnimationFrame(loop);

