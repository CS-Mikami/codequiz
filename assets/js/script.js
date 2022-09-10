// id variables
var containerQuestionEl = document.getElementById("question-container");
var containerStartEl = document.getElementById("start-container");
var startBtnEl = document.getElementById("link-start");
var containerEndEl = document.getElementById("end-container")
var containerScoreEl = document.getElementById("score-banner")
var formInitials = document.getElementById("name-form")
var containerHighScoresEl = document.getElementById("highscore-container")
var ViewHighScoreEl = document.getElementById("see-highscores")
var listHighScoreEl = document.getElementById("highscore-list")
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("wrong")

//buttons
var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#back")
var btnClearScoresEl = document.querySelector("#clear-highscores")

//questions+answers elements
var questionEl = document.getElementById("question")
var answerbuttonsEl = document.getElementById("answers-buttons")
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover;

//highscore array
var HighScores = [];

var arrayMixedQuestions;
var QuestionIndex = 0;

// questions arrays
var questions = [
    { question1: 'Commonly used data type do NOT include ___', 
      answer1: 'C. Alerts', 
      choices: [{choice: 'A. Strings'}, {choice: 'B. Booleans'}, {choice: 'C. Alerts'}, {choice: 'D. Numbers'}]
    },
    { question2: 'The condition if/else statement is enclosed with ___', 
      aanswer2: 'C. parentheses', 
      choices: [{choice: 'A. quotes);'}, {choice: 'B. curly brackets'}, {choice: 'C. parentheses'}, {choice: 'D. square brackets'}]
    },
    { question3: 'Arrays in JavaScript can be used to store ___', 
      answer3: 'D. All of the above', 
      choices: [{choice: 'A. numbers and strings'}, {choice: 'B. other arrays'}, {choice: 'C. booleans'}, {choice: 'D. All of the above'}]
    },
    { question4: 'String values must be enclosed within ____ when being assigned to variables', 
      answer4: 'C. quotes', 
      choices: [{choice: 'A. commas'}, {choice: 'B. curly brackets'}, {choice: 'C. quotes'}, {choice: 'D. parentheses'}]
    },
    { question5: 'A very useful tool used during development and debugging for printing content to the debugger ___', 
      answer5: 'D. console.log', 
      choices: [{choice: 'A. JavaScript'}, {choice: 'B. terminal/bash'}, {choice: 'C. for loops'}, {choice: 'D. console.log'}]
    },
  ];

  //if back button is hit on scores page
var startPage = function () {
    containerHighScoresEl.classList.add("hidden")
    containerHighScoresEl.classList.remove("shown")
    containerStartEl.classList.remove("hidden")
    containerStartEl.classList.add("shown")
    containerScoreEl.removeChild(containerScoreEl.lastChild)
    QuestionIndex = 0
    gameover = ""
    timerEl.textContent = 0 
    score = 0
    if (correctEl.className = "shown") {
        correctEl.classList.remove("shown");
        correctEl.classList.add("hidden")
    }
    if (wrongEl.className = "shown") {
        wrongEl.classList.remove("shown");
        wrongEl.classList.add("hidden");
    }
  }

  var startGame = function() {
    //add classes to show/hide start and quiz screen
    containerStartEl.classList.add('hidden');
    containerStartEl.classList.remove('shown');
    containerQuestionEl.classList.remove('hidden');
    containerQuestionEl.classList.add('shown');

    //random order for questions
    arrayMixedQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
  }

  //seconds from the start, 
var setTime = function () {
    timeleft = 60;
// dont forget that setInterval time is in miliseconds!
var timercheck = setInterval(function() {
        timerEl.innerText = timeleft;
        timeleft--
      
        if (gameover) {
            clearInterval(timercheck)
        }
       
        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }
      
        }, 1000)
      }
      
    //set next question for quiz
var setQuestion = function() {
    resetAnswers()
    displayQuestion(arrayMixedQuestions[QuestionIndex])
  }
  
  //remove answer buttons
  var resetAnswers = function() {
    while (answerbuttonsEl.firstChild) {
        answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
    };
  };

  //display question information (including answer buttons)
var displayQuestion = function(index) {
    questionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", answerCheck)
        answerbuttonsEl.appendChild(answerbutton)
        }
    };
  //display correct! on screen
  var answerCorrect = function() {
    if (correctEl.className = "hidden") {
        correctEl.classList.remove("hidden")
        correctEl.classList.add("banner")
        wrongEl.classList.remove("banner")
        wrongEl.classList.add("hidden")
        }
    }  
  //display wrong! on screen
  var answerWrong = function() {
    if (wrongEl.className = "hidden") {
        wrongEl.classList.remove("hidden")
        wrongEl.classList.add("banner")
        correctEl.classList.remove("banner")
        correctEl.classList.add("hidden")
    }
  }
  
  //check if answer is correct    
  var answerCheck = function(event) {
    var selectedanswer = event.target
        if (arrayMixedQuestions[QuestionIndex].a === selectedanswer.innerText){
            answerCorrect()
            score = score + 7
        }
  
        else {
          answerWrong()
          score = score - 1;
          timeleft = timeleft - 10;
      };
  
    //go to next question, check if there is more questions
      QuestionIndex++
        if  (arrayMixedQuestions.length > QuestionIndex + 1) {
            setQuestion()
        }   
        else {
           gameover = "true";
           showScore();
            }
  }
  
    //Display total score screen at end of game
  var showScore = function () {
    containerQuestionEl.classList.add("hidden");
    containerEndEl.classList.remove("hidden");
    containerEndEl.classList.add("shown");
  
    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score + "!");
    containerScoreEl.appendChild(scoreDisplay);
  }       
  
  //create high score values
  var createHighScore = function(event) { 
    event.preventDefault() 
    var initials = document.querySelector("#name").value;
    if (!initials) {
      alert("Enter your name!");
      return;
    }
  
  formInitials.reset();
  
  var HighScore = {
  initials: initials,
  score: score
  } 
  
  //push and sort scores
  HighScores.push(HighScore);
  HighScores.sort((a, b) => {return b.score-a.score});
  
  //clear visibile list to resort
  while (listHighScoreEl.firstChild) {
   listHighScoreEl.removeChild(listHighScoreEl.firstChild)
  }
  //create elements in order of high scores
  for (var i = 0; i < HighScores.length; i++) {
  var highscoreEl = document.createElement("li");
  highscoreEl.ClassName = "highscore";
  highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
  listHighScoreEl.appendChild(highscoreEl);
  }
  
  saveHighScore();
  displayHighScores();
  
  }
  //save high score
  var saveHighScore = function () {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))
        
  }
  
  //load values/ called on page load
  var loadHighScore = function () {
    var LoadedHighScores = localStorage.getItem("HighScores")
        if (!LoadedHighScores) {
        return false;
    }
  
    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a, b) => {return b.score-a.score})
  
  
    for (var i = 0; i < LoadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "highscore";
        highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);
  
        HighScores.push(LoadedHighScores[i]);
        
    }
  }  
  
  //display high score screen from link or when intiials entered
  var displayHighScores = function() {
  
    containerHighScoresEl.classList.remove("hidden");
    containerHighScoresEl.classList.add("shown");
    gameover = "true"
  
    if (containerEndEl.className = "shown") {
        containerEndEl.classList.remove("shown");
        containerEndEl.classList.add("hidden");
        }
    if (containerStartEl.className = "shown") {
        containerStartEl.classList.remove("shown");
        containerStartEl.classList.add("hidden");
        }
        
    if (containerQuestionEl.className = "shown") {
        containerQuestionEl.classList.remove("shown");
        containerQuestionEl.classList.add("hidden");
        }
  
    if (correctEl.className = "shown") {
        correctEl.classList.remove("shown");
        correctEl.classList.add("hidden");
    }
  
    if (wrongEl.className = "shown") {
        wrongEl.classList.remove("shown");
        wrongEl.classList.add("hidden");
        }
    
  }
  //clears high scores
  var clearScores = function () {
    HighScores = [];
  
    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild);
    }
  
    localStorage.clear(HighScores);
  
  } 
  
  loadHighScore()
  
  //on start click, start game
  btnStartEl.addEventListener("click", startGame)
  //on submit button -- enter or click
  formInitials.addEventListener("submit", createHighScore)
  //when view high-scores is clicked
  ViewHighScoreEl.addEventListener("click", displayHighScores)
  //Go back button
  btnGoBackEl.addEventListener("click", renderStartPage)
  //clear scores button
  btnClearScoresEl.addEventListener("click", clearScores)