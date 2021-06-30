// //determines the amount of starting time
var time = questions.length * 15;
var currentQuestionIndex = 0;
var currentQuestion;
var timeLeft;
var startQuiz;

var startButton         = document.querySelector("#start-button");
var questionsElement    = document.querySelector("#questionArray");
var timer               = document.querySelector("#time");
var choices             = document.querySelector("#possible-answers");
var StartScreen         = document.querySelector("#start-screen");
var EndScreen           = document.querySelector("#end");
var questionText        = document.querySelector("#question-text");
var form                = document.getElementById("form");

//added for storage
var count = localStorage.getItem("score");



function startQuiz() {
    countdown();
    StartScreen.setAttribute("class", "hide");
    questionsElement.removeAttribute("class", "hide");
    getQuestion();
}

function endQuiz() {
    //get time from timer element
    clearInterval(startQuiz);
    questionsElement.setAttribute("class", "hide");
    EndScreen.removeAttribute("class", "hide");
    var finalScore = document.querySelector("#final-score");  
    finalScore.textContent = timer.textContent;
}


function getQuestion() {
    console.log(timeLeft);
    if (questions[currentQuestionIndex] === undefined) {
        endQuiz();
        return;
    }

    currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.text;
    choices.textContent = "";

    for (var i = 0; i < currentQuestion.choice.length; i++) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", currentQuestion.choice[i]);
        choiceNode.textContent = i + 1 + ". " + currentQuestion.choice[i];
        choices.appendChild(choiceNode);
        choiceNode.addEventListener("click", checkAnswer);
    }
}

function checkAnswer(event) {
    console.log(currentQuestion);
    console.log(event.target.value);

    if (event.target.value === currentQuestion.answer) {
        console.log("Correct!");
        
    }
    else {
        console.log("nope");
        timeLeft = timeLeft - 3;
    }
    currentQuestionIndex++
    getQuestion();
}

startButton.addEventListener("click", startQuiz);

function countdown() {
    timeLeft = 15;

    startQuiz = setInterval(function () {

        if (timeLeft > 1) {

            timer.textContent = timeLeft;

            timeLeft--;
        } else {

            timer.textContent = '0';
            //endQuiz();
            clearInterval(startQuiz);

        }
    }, 1000);
}

var existingScores = localStorage.getItem("highscores");
var scoresArray = [];

if (existingScores) {
    existingScores = JSON.parse(existingScores);
    for (let index = 0; index < existingScores.length; index++) {
        scoresArray.push(existingScores[index]);
    }
}

function formSubmit(event) { 
    event.preventDefault(); 
    scoresArray.push({ 'username': username.value, "score": timer.textContent })
    localStorage.setItem("highscores", JSON.stringify(scoresArray)); 
    location.href = "./scoreboard.html";
} 

form.addEventListener('submit', formSubmit);



