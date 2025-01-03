
// get Objects
const xBox = document.getElementById("x");
const yBox = document.getElementById("y");
const scorebox = document.getElementById("scorebar");
const headerbox = document.getElementById("topbar");
const gamebox = document.getElementById("gamebox");
const questionbox = document.getElementById("questionbox");
const answerbox = document.getElementById("answerbox");
const operatorbox = document.getElementById("function");
const operator = document.getElementById("operator");
const magicButton = document.getElementById("magicButton");
const liveTime = document.getElementById("countdown");
const liveScore = document.getElementById("livescore");

let x = y = null;
let correctAnswer = null;
var isGameOver = false;

var attemptCount = 0;
var correctCount = 0;

var gameDuration = 61000;
var timeLeft = gameDuration;
var timerRunning = false ;
var tempQuestionType = null;






// initialise page
scorebox.style.display = "none";
questionbox.style.display = "none";
answerbox.style.display = "none";
operatorbox.style.display = "none";
var startButton = document.createElement('div');
startButton.id = "startbox";
var startButtonText = document.createTextNode('Start Game');
startButton.appendChild(startButtonText);
gamebox.insertBefore(startButton,questionbox);
startButton.addEventListener('click', startGame);

// start Game Loop 

function startGame() {
    isGameOver = false;
    timeLeft = gameDuration;
    attemptCount = correctCount = 0;
    updateTime();
    liveTime.style.color = "#2c3e50";
    updateScore();
    startButton.remove();

    headerbox.style.display = "none";
    scorebox.style.display = "flex";
    questionbox.style.display = "flex";
    answerbox.style.display = "flex";
    operatorbox.style.display = "flex";


    myInterval = setInterval(updateTime, 1000);
    setTimeout(gameOver, gameDuration);
    gameLoop();




}



// MAIN GAME LOOP
function gameLoop() { 


    if (isGameOver==false) {
        attemptCount++;
        createQuestion();
        generateAnswers();
        validateAnswer();

    }
    
    
}




// create questions
function createQuestion() {

    operatorbox.style.display = "flex";

    var questionTypeArray = ["A","B"];
    tempQuestionType = questionTypeArray[Math.round(Math.random())];

    x = generateX(tempQuestionType);
    xBox.innerHTML = formatNumber("X", x);

    y = generateY(tempQuestionType);
    yBox.innerHTML = formatNumber("normal",y);

    changeOperator(tempQuestionType);

    correctAnswer = x*y;
    
}



// generate answers
function generateAnswers(){

    // create array of 4 answers
    var answerArray = [];
    var decoyMagnitudeArrayTypeA = [0.000001, 0.00001, 0.0001,0.001,0.01, 0.1]; 
    var decoyMagnitudeArrayTypeB = [0.001,0.01, 0.1,10,100,1000]; 

    if (tempQuestionType=="A") {
        var decoyMagnitudeArray = decoyMagnitudeArrayTypeA;
    } else if (tempQuestionType=="B") {
        var decoyMagnitudeArray = decoyMagnitudeArrayTypeB;
    } else {
        console.log("Error with array creation");
    }


    shuffle(decoyMagnitudeArray);
    

   answerArray.push(correctAnswer);

   for (let i = 0; i < 3; i++) {
    var decoyAns = correctAnswer * decoyMagnitudeArray.shift();
    answerArray.push(decoyAns);
   }

   shuffle(answerArray);


   for (let i = 0; i < 4; i++) {
    var optionBox = document.createElement("div");
    optionBox.className = "answeroption";

    var optionContent = answerArray.shift();

    if (optionContent==correctAnswer) {
        optionBox.id = "correctAns";
    } else {
        optionBox.id = "wrongAns";
    }
    
    var option = document.createTextNode(formatNumber("normal",optionContent));
    optionBox.appendChild(option);
    answerbox.appendChild(optionBox);
    optionBox.addEventListener('click',validateAnswer);
    

   }




}



// validate answer 
function validateAnswer(event) {
    const clickedElement = event.target;


    if (clickedElement.id == "correctAns") {
        clickedElement.style.backgroundColor = "#2ecc71";
        correctCount++;
    } else {
        clickedElement.style.backgroundColor = "#e74c3c";
        document.getElementById("correctAns").style.backgroundColor = "#2ecc71";
    }

    // optionBox.removeEventListener('click',validateAnswer);

    updateScore();
    setTimeout(clearBoard, 1200);
    setTimeout(gameLoop, 1500);
}


// game Over function 
function gameOver() {
    clearBoard();
    isGameOver = true;
    clearInterval(myInterval);

    var gameOverBox = document.createElement("div");
    gameOverBox.id = "gameOverBox";
    
    var gameOverText1 = document.createElement("p");
    var gameOverText1Node = document.createTextNode("Game Over!");
    var gameOverText2 = document.createElement("p");
    var gameOverText3 = document.createElement("p");

    if (correctCount ==1) {
        scoreString = "You got "+correctCount+" answer correct.";
    } else {
        scoreString = "You got "+correctCount+" answers correct.";
    }
    

    var scoreStringNode = document.createTextNode(scoreString);
    var scoreMsgNode = document.createTextNode(scoreMessage(correctCount));
    gameOverBox.appendChild(gameOverText1);
    gameOverText1.appendChild(gameOverText1Node);
    gameOverBox.appendChild(gameOverText2);
    gameOverText2.appendChild(scoreStringNode);

    gameOverText3.style.color = "#7f8c8d";

    gameOverBox.appendChild(gameOverText3);
    gameOverText3.appendChild(scoreMsgNode);
    gamebox.appendChild(gameOverBox);
    
    
    //add option to restart
    //draw button
    //on click call clearBoard and st

    var restartButton = document.createElement('div');
    restartButton.id = "startbox";
    var restartButtonText = document.createTextNode('Restart Game');
    restartButton.appendChild(restartButtonText);
    gamebox.appendChild(restartButton);

    restartButton.addEventListener('click', sweepBoard);
    restartButton.addEventListener('click', clearBoard);
    restartButton.addEventListener('click', startGame);
}






///// AUXILLIARY FUNCTIONS

// game is fun either if it's (A) small % of a large number, or if it is (B) large multiple of a number
// will start with (A) for now
//now doing (B) - x should be 100 to 10,000, 

function generateX(type) {

    if (type=="A"){
        // (A) generate a % in the 1 to 20% range
        var max = 25;
        var min = 1;
        var finalX = (Math.floor(Math.random() * (max - min) + min))/100;
        return finalX;
    } else if (type=="B") {
        // (B) generate a simple, small number below 10,000
        var num = (Math.floor(Math.random() * (20 - 1) + 1));
        var magnitudeArray = [1,10,100];
        var mag = magnitudeArray[Math.floor(Math.random()*magnitudeArray.length)];
        return num*mag;
    } else {
        return "11"
    }
    
    



}

function generateY(type) {

    if (type == "A") {
        // (A) generate a simple but large number
        var magnitudeArray = [100000,1000000,10000000,100000000,1000000000,10000000000];
        var num = (Math.floor(Math.random() * (10 - 1) + 1));
        var mag = magnitudeArray[Math.floor(Math.random()*magnitudeArray.length)]
        return num*mag;
    } else if (type =="B") {
        // (B) generate a simple but large number
        var magnitudeArray = [100, 1000,10000,100000,1000000,10000000];
        var num = (Math.floor(Math.random() * (10 - 1) + 1));
        var mag = magnitudeArray[Math.floor(Math.random()*magnitudeArray.length)];
        return num*mag;
    } else {
        return "22";
    }

}
    
function changeOperator(type) {
    if (type == "A") {
        // of
        operator.innerHTML = "of";
        operator.style.color = "#2980b9";
        
    } else if (type =="B") {
        // into
        operator.innerHTML = "into";
        operator.style.color = "#16a085";
        
    } else {
        operator.style.color = "#c0392b";
        console.log("error w operator");
        return "error w operator";
    }
}
    

function formatNumber(type, number) {
    //less than 1 becomes a %
    if (type == "X") {
        if (number<1) {
            return (number*100).toFixed() + "%";
        }
    }
    
    //mid numbers get commas

    //large numbers get text
    if (number>0 && number<1000) {
        return number.toFixed();
    } else if (number>=1000 && number<100000) {
        return number.toLocaleString();
    } else if (number>=100000 && number<10000000) {
        return number.toFixed()/100000 + " lakhs";
    } else if (number>=10000000) {
        return number.toFixed()/10000000 + " crores";
    }

}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

function sweepBoard() {

    document.getElementById("startbox").remove();
    gameOverBox.remove();
}

function clearBoard() {
    var items = document.getElementsByClassName("answeroption");

    xBox.innerHTML = null;
    yBox.innerHTML = null;
    operatorbox.style.display = "none";


    for (var i = items.length; i > 0; i--) {
        items[i-1].remove();
    }


}

function updateScore() {
    liveScore.innerHTML = "Score: "+correctCount;
}

function updateTime() {

    if (timeLeft <= 0) {
        return;
    }

    timeLeft -= 1000;


    var minutes = Math.floor(timeLeft/60000).toFixed();
    var seconds = (timeLeft%60000)/1000;

    if (seconds>=10) {
        liveTime.innerHTML = minutes+":"+seconds;
    } else {
        liveTime.innerHTML = minutes+":0"+seconds;
        if (minutes == 0) {
            liveTime.style.color = "#c0392b";
        }
    }
    
}


function scoreMessage(score) {
    var scoreMsg = null; 

    if (score==0) {
        scoreMsg = "WAHHHH 👏 You suck...";
    } else if (score>0 && score<=3) {
        scoreMsg = "Tragic... Please study hard and come back...";
    } else if (score>3 && score<=6) {
        scoreMsg = "Um, not the worst, but not good. Practice harder...";
    } else if (score>6 && score<=9) {
        scoreMsg = "Pretty good. But you still have work to do...";
    } else if (score>9 && score<=13) {
        scoreMsg = "Nice one. You're ready to be an analyst 🙏";
    } else if (score>13) {
        scoreMsg = "Prodigy 👏 You have mastered the VC game!";
    }
    return scoreMsg;
}


