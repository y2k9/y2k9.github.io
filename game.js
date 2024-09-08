/*
Hi
This is the code for a game
Work started 7th Sept 2024

Game is about catching a goose with a box

*/

// declare variables
const resetBtn = document.querySelector(".reset");
const newBtn = document.querySelector(".create");
const goose = document.getElementById("hero");
const glassBox = document.getElementById("glassbox");
const infoBtn = document.getElementById("infoicon");
const infoPopUp = document.getElementById("popup");
const closePopUpBtn = document.getElementById("close");
const gameOverPopUp = document.getElementById("gameover");
const restartBtn = document.querySelector(".restartGame");

// const restartButton 
const directions = [[-1,0],[1,0],[0,-1],[0,1]] // left, right, up, down dx dy respectively
let score = 0;

// goose mechanics
let xGoose = Math.floor((Math.random() * window.innerWidth)); // init position
let yGoose = Math.floor((Math.random() * window.innerHeight)); 
goose.style.left = xGoose+"px";
goose.style.top = yGoose+"px";
goose.style.display = "block";
let dx = dy = 0; //init speed 
const gooseSpeed = 6; 
let countSteps = 10; //affects turn freq


// box mechanics 
let xBox = 300; // init position
let yBox = 200; 
glassBox.style.left = xBox + "px";
const boxSpeed = 5;
let dxBox = dyBox = 0;

// initialise game
let canvas = document.getElementById("game");
let ctx = canvas.getContext('2d');
canvas.style.width = (window.innerWidth-20)+"px";
canvas.style.height = (window.innerHeight-200)+"px";
goose.style.left = "20px";
goose.style.top = "90px";
document.getElementById("score").innerHTML = "Score: " + score;


// hiding some elements with no function for now
newBtn.style.display = "none";
resetBtn.style.display = "none";



// buttons
resetBtn.addEventListener("click", resetGoose);
infoBtn.addEventListener("click",showInfoPopUp);
newBtn.addEventListener("click",incrementScore);
closePopUpBtn.addEventListener("click",hideInfoPopUp);
restartBtn.addEventListener("click",restartGame);


function restartGame() {
    incrementScore();
    resetGoose();
    hideGameOver();
}




// move functions for Goose
function gooseLeft(){
    if (xGoose<20){
        xGoose = window.innerWidth;
    } else {
        xGoose -= gooseSpeed;
        
    }
    goose.style.left = xGoose + "px";
    goose.src = "images/goose.png";
}
function gooseRight() {
    if (xGoose > (window.innerWidth-50)) {
        xGoose = 0;
    } else {
        xGoose += gooseSpeed;
    }
    goose.style.left = xGoose + "px";
    goose.src = "images/rightWalk1.png";
}
function gooseDown() {
    if (yGoose> window.innerHeight-180) {
        yGoose = 80;
    } else {
        yGoose += gooseSpeed;
    }
    goose.style.top = yGoose + "px";
    goose.src = "images/downWalk1.png";

}
function gooseUp() {
    if (yGoose < 90) {
        yGoose = window.innerHeight-180;
    } else {
        yGoose -= gooseSpeed;
    }
    goose.style.top = yGoose + "px";
    goose.src = "images/upWalk1.png";
}


// move functions for Box
function boxLeft() {
    if (xBox<20){
        xBox = window.innerWidth;
    } else {
        xBox -= boxSpeed;
        
    }
    glassBox.style.left = xBox + "px";
}
function boxRight() {
    if (xBox > (window.innerWidth-50)) {
        xBox = 0;
    } else {
        xBox += boxSpeed;
    }
    glassBox.style.left = xBox + "px";
}
function boxDown() {
    if (yBox> window.innerHeight-180) {
        yBox = 80;
    } else {
        yBox += boxSpeed;
    }
    glassBox.style.top = yBox + "px";

}
function boxUp() {
    if (yBox < 90) {
        yBox = window.innerHeight-180;
    } else {
        yBox -= boxSpeed;
    }
    glassBox.style.top = yBox + "px";
}




// pop up description
function showInfoPopUp() {
    infoPopUp.style.display = "block";
}
function hideInfoPopUp() {
    infoPopUp.style.display = "none";
}
function showGameOver() {
    gameOverPopUp.style.display = "block";
}
function hideGameOver() {
    gameOverPopUp.style.display = "none";
}


// functionality
function resetGoose() {
    xGoose = 20;
    yGoose = 90;
    dx = dy = dxBox = dyBox = 0;
    goose.style.left = xGoose + "px";
    goose.style.top = yGoose + "px";
    console.log("Position reset");
}


function incrementScore() {
    score++;
    console.log("The score updated to "+score);
    document.getElementById("score").innerHTML = "Score: " + score;
}
function checkIfCaught() {
    let sensitivity = 25;
    if ((Math.abs(xBox-xGoose)<sensitivity)&&(Math.abs(yBox-yGoose)<sensitivity)){
        showGameOver();
        dx = dy = dxBox = dyBox = 0;
    } 
}





// main loop
function loop() {
    requestAnimationFrame(loop);

    // make the goose walk by velocity
    if (dx==-1){
        gooseLeft();
    } else if (dx==1){
        gooseRight();
    }

    if (dy==-1){
        gooseUp();
    } else if (dy==1){
        gooseDown();
    }


    if (dxBox==-1){
        boxLeft();
    } else if (dxBox==1){
        boxRight();
    }

    if (dyBox==-1){
        boxUp();
    } else if (dyBox==1){
        boxDown();
    }


    // check for collision with treat
    // eat treat, increment score
    // create new treat

    randomWalk();

    checkIfCaught();

}



// listen for steps
document.addEventListener('keydown', function(e) {
    if(e.which === 37) {
        console.log('Left was pressed');
        dyBox=0;
        dxBox = -1;
        

    }
    else if(e.which === 39) {
        console.log('Right was pressed');
        dxBox = 1;
        dyBox = 0;
        
    }
    else if(e.which === 38) {
        console.log('Up was pressed');
        dyBox = -1;
        dxBox = 0;
    }
    else if(e.which == 40) {
        console.log('Down was pressed');
        dyBox = 1;
        dxBox = 0;
    }
});


// execute game
requestAnimationFrame(loop);


//randomWalk
function randomWalk() { 

    let x = Math.round(Math.random()*4); // 4 means 25% probability it will turn
    
    if (countSteps>=20) {
        if (x==1){
            let newDirection = directions[Math.floor(Math.random() * directions.length)];
            dx = newDirection[0];
            dy = newDirection[1];
            countSteps = 0;
        } else {
            countSteps = 0;
        }
        
    } else {
        countSteps++;
    }
    
    
}
