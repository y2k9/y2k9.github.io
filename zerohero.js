
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

var gameMode = null;

var zeroHeroStartButton = null;
var valProStartButton = null;

console.log("Welcome to VC for Dummies");
console.log("a y2k9 production");
console.log("this is version 4");



function initialiseGame() {
    // initialise page
    headerbox.style.display = "flex";
    scorebox.style.display = "none";
    questionbox.style.display = "none";
    answerbox.style.display = "none";
    operatorbox.style.display = "none";

    // start Game 1 - Zero Hero 
    zeroHeroStartButton = document.createElement('div');
    zeroHeroStartButton.className = "startbox";
    zeroHeroStartButton.id = "zeroherostartbox";
    var zeroHeroStartButtonText = document.createTextNode('Play Zero Hero');
    zeroHeroStartButton.appendChild(zeroHeroStartButtonText);
    gamebox.insertBefore(zeroHeroStartButton,questionbox);
    zeroHeroStartButton.addEventListener('click', () => changeGameMode("zerohero"));
    zeroHeroStartButton.addEventListener('click', startGame);

    // start Game 2 - VC Math (for now just pre money)
    valProStartButton = document.createElement('div');
    valProStartButton.className = "startbox";
    valProStartButton.id = "valprostartbox";
    var valProStartButtonText = document.createTextNode('Play Valuation Pro');
    valProStartButton.appendChild(valProStartButtonText);
    gamebox.insertBefore(valProStartButton,questionbox);
    valProStartButton.addEventListener('click', () => changeGameMode("valpro"));
    valProStartButton.addEventListener('click', startGame); 

}

initialiseGame();



// Zero Hero Game Loop 
function startGame() {
    isGameOver = false;
    timeLeft = gameDuration;
    attemptCount = correctCount = 0;
    updateTime();
    liveTime.style.color = "#2c3e50";
    updateScore();
    zeroHeroStartButton.remove();
    valProStartButton.remove();

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
    questionbox.style.display = "flex";

    if (gameMode == "zerohero") {
        var questionTypeArray = ["ZHA","ZHB"];
        tempQuestionType = questionTypeArray[Math.round(Math.random())];
    } else if (gameMode == "valpro") {
        var questionTypeArray = ["VPPre","VPPost"];
        tempQuestionType = questionTypeArray[Math.round(Math.random())];
    }


    x = generateX(tempQuestionType);
    xBox.innerHTML = formatNumber("X", x);

    y = generateY(tempQuestionType);
    yBox.innerHTML = formatNumber("Y",y);

    changeOperator(tempQuestionType);

    if (gameMode == "zerohero") {
        correctAnswer = x*y;
    } else if (gameMode == "valpro") {
        if (tempQuestionType == "VPPost") {
            correctAnswer = (1/y)*x;
        } else if (tempQuestionType == "VPPre") {
            correctAnswer = ((1/y)*x)-x;
        }
        
    }
    
    
}



// generate answers
function generateAnswers(){

    // create array of 4 answers
    var answerArray = [];
    var decoyMagnitudeArrayTypeZHA = [0.000001, 0.00001, 0.0001,0.001,0.01, 0.1]; 
    var decoyMagnitudeArrayTypeZHB = [0.001,0.01, 0.1,10,100,1000]; 

    if (tempQuestionType=="ZHA") {
        var decoyMagnitudeArray = decoyMagnitudeArrayTypeZHA;
    } else if (tempQuestionType=="ZHB") {
        var decoyMagnitudeArray = decoyMagnitudeArrayTypeZHB;
    } else if (tempQuestionType=="VPPre" ||tempQuestionType=="VPPost")  {
        var decoyMagnitudeArray = [0.7,0.8,0.9,1.1,1.2,1.3];
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
    
    var option = document.createTextNode(formatNumber("answer",optionContent));
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
    
    
    // Replay Game
    var restartButton = document.createElement('div');
    restartButton.className = "startbox";
    restartButton.id = "restartbox";
    var restartButtonText = document.createTextNode('Play Again');
    restartButton.appendChild(restartButtonText);
    gamebox.appendChild(restartButton);

    restartButton.addEventListener('click', sweepBoard);
    restartButton.addEventListener('click', clearBoard);
    restartButton.addEventListener('click', startGame);
    
    // Back to Home
    var backHomeButton = document.createElement('div');
    backHomeButton.className = "startbox";
    backHomeButton.id = "backhomebutton";
    var backHomeButtonText = document.createTextNode("Back Home");
    backHomeButton.appendChild(backHomeButtonText);
    gamebox.appendChild(backHomeButton);

    backHomeButton.addEventListener('click', sweepBoard);
    backHomeButton.addEventListener('click', clearBoard);
    backHomeButton.addEventListener('click', initialiseGame);




}






///// AUXILLIARY FUNCTIONS

// game is fun either if it's (A) small % of a large number, or if it is (B) large multiple of a number
// will start with (A) for now
//now doing (B) - x should be 100 to 10,000, 

function generateX(type) {

    // Zero Hero
    if (gameMode == "zerohero") {
        if (type=="ZHA"){
            // (A) generate a % in the 1 to 25% range
            var max = 25;
            var min = 1;
            var finalX = (Math.floor(Math.random() * (max - min) + min))/100;
            return finalX;
        } else if (type=="ZHB") {
            // (B) generate a simple, small number below 10,000
            var num = (Math.floor(Math.random() * (20 - 1) + 1));
            var magnitudeArray = [1,10,100];
            var mag = magnitudeArray[Math.floor(Math.random()*magnitudeArray.length)];
            return num*mag;
        } else {
            return "Generate X Error - Zero Hero "
        }   
        

    // Valuation Pro   
    } else if (gameMode == "valpro") {
        var num = (Math.floor(Math.random() * (10 - 1) + 1));
        var magnitudeArray = [100000,1000000,10000000,10000000];
        var mag = magnitudeArray[Math.floor(Math.random()*magnitudeArray.length)];
        return num*mag;


    } else {
        console.log("Generate X Error - Generic")
        return "Generate X Error - Generic";

    }

    
    



}

function generateY(type) {

    // Zero Hero
    if (gameMode== "zerohero") {
        if (type == "ZHA") {
            // (A) generate a simple but large number
            var magnitudeArray = [100000,1000000,10000000,100000000,1000000000,10000000000];
            var num = (Math.floor(Math.random() * (10 - 1) + 1));
            var mag = magnitudeArray[Math.floor(Math.random()*magnitudeArray.length)]
            return num*mag;
        } else if (type =="ZHB") {
            // (B) generate a simple but large number
            var magnitudeArray = [100, 1000,10000,100000,1000000,10000000];
            var num = (Math.floor(Math.random() * (10 - 1) + 1));
            var mag = magnitudeArray[Math.floor(Math.random()*magnitudeArray.length)];
            return num*mag;
        } else {
            return "22";
        }


    // Valuation Pro
    } else if (gameMode == "valpro") {
        // (A) generate a % in the 1 to 25% range
        var max = 25;
        var min = 1;
        var finalX = (Math.floor(Math.random() * (max - min) + min))/100;
        return finalX;

    // Error Handling
    } else {
        return 2;
    }

    

}
    
function changeOperator(type) {
    if (type == "ZHA") {
        // of
        operator.innerHTML = "of";
        operator.style.color = "#2980b9";
        
    } else if (type =="ZHB") {
        // into
        operator.innerHTML = "into";
        operator.style.color = "#16a085";
    } else if (type =="VPPre" || type =="VPPost" ) {
        // into
        operator.innerHTML = "for";
        operator.style.color = "#16a085";

    } else {
        operator.style.color = "#c0392b";
        console.log("error w operator");
        return "error w operator";
    }
}

function formatNumber(type, number) {

    
    // Zero Hero 
    if (gameMode == "zerohero") {
        if (type == "X") {
            if (number<1) {
                return (number*100).toFixed() + "%";
            }
        }
        
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
    
        

    // Valuation Pro
    } else if  (gameMode=="valpro") {
      
        if (number<1) {
            return (number*100).toFixed() + "%";
        } else if (type=="X") {
            if (number>0 && number<1000) {
                return number.toFixed();
            } else if (number>=1000 && number<100000) {
                return number.toLocaleString();
            } else if (number>=100000 && number<10000000) {
                return number.toFixed()/100000 + " lakhs";
            } else if (number>=10000000) {
                return number.toFixed()/10000000 + " crores";
            }
        } else if (type == "answer") {

            if (tempQuestionType=="VPPre") {
                if (number>=100000 && number<10000000) {
                    if (getDecimalPlaces(number)>1) {
                        return (number/100000).toFixed(1) + " Lakhs" + " Pre-Money";
                    }
                    return number.toFixed()/100000 + " Lakhs" + " Pre-Money";
    
                } else if (number>=10000000) {
                    if (getDecimalPlaces(number)>1) {
                        return (number/10000000).toFixed(1) + " Crores" + " Pre-Money";
                    }
                    return number.toFixed()/10000000 + " Crores" + " Pre-Money";
                }

            } else if (tempQuestionType=="VPPost"){
                if (number>=100000 && number<10000000) {
                    if (getDecimalPlaces(number)>1) {
                        return (number/100000).toFixed(1) + " Lakhs" + " Post-Money";
                    }
                    return number.toFixed()/100000 + " Lakhs" + " Post-Money";
    
                } else if (number>=10000000) {
                    if (getDecimalPlaces(number)>1) {
                        return (number/10000000).toFixed(1) + " Crores" + " Post-Money";
                    }
                    return number.toFixed()/10000000 + " Crores" + " Post-Money";
                }
            } else {
                return "error in VPro Answer Formatting"
            }

            



        } else {
            console.log("error in number formatting for val pro");
            return "error in number formatting for val pro";
        }

    // Error Handling
    } else {
        console.log("error in number formatting");
        return "error in number formatting";
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

    document.querySelector("#restartbox").remove();
    document.querySelector("#backhomebutton").remove();
    gameOverBox.remove();
}

function clearBoard() {
    var items = document.getElementsByClassName("answeroption");

    xBox.innerHTML = null;
    yBox.innerHTML = null;
    questionbox.style.display = "none";
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

    if (gameMode=="zerohero") {
        if (score==0) {
            scoreMsg = "👏👏👏👏  You suck... 👏👏👏👏 ";
        } else if (score>0 && score<=3) {
            scoreMsg = "Tragic... How many zeros are in 'That was SOOOO bad' ? ";
        } else if (score>3 && score<=6) {
            scoreMsg = "Not bad, but you still need to practice harder...";
        } else if (score>6 && score<=9) {
            scoreMsg = "Pretty good! You're finally smarter than a 5th grader..";
        } else if (score>9 && score<=13) {
            scoreMsg = "Amazing! Almost as good as the YASH himself.";
        } else if (score>13) {
            scoreMsg = "Prodigy 👏 You're a Zero Hero!";
        }
        
    } else if (gameMode=="valpro") {
        if (score==0) {
            scoreMsg = "👏👏👏👏  You suck... 👏👏👏👏 ";
        } else if (score>0 && score<=2) {
            scoreMsg = "Tragic... no deal for you! ";
        } else if (score>2 && score<=4) {
            scoreMsg = "Not bad. With a little practice you can start making deals ";
        } else if (score>4 && score<=6) {
            scoreMsg = "Pretty good. You're ready to start raising";
        } else if (score>6 && score<=7) {
            scoreMsg = "Nice one. Have you considered a career in investing?";
        } else if (score>7) {
            scoreMsg = "Legend 👏 You're a Valuation Pro! ";
        }


    } else {
        scoreMsg = "Keep going!";
    }

    return scoreMsg;
    
}

function changeGameMode(mode) {
    gameMode = mode;

    if (gameMode=="valpro") {
        scorebox.style.backgroundColor = "rgba(52, 152, 219, 0.4)";
    } else if (gameMode=="zerohero") {
        scorebox.style.backgroundColor = "rgba(46, 204, 113, 0.4)";
    } else {
        scorebox.style.backgroundColor = "#a6acaf"
    }
}


function getDecimalPlaces(number) {
    if (!Number.isFinite(number)) return 0; // Handle edge cases like Infinity or NaN
  
    const numberString = number.toString();
  
    if (numberString.includes('.')) {
      return numberString.split('.')[1].length;
    }
  
    return 0; // No decimal places if there's no '.'
}
