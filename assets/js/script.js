const timerEl = document.querySelector("#timer");
const quizEl = document.querySelector("#quiz");
const startPageEl = document.querySelector("#start");
const startBtnEl = document.querySelector("#start-button");
const results = document.querySelector("#results");
const scoreEl = document.querySelector("#your-score");
const scoreDisplayEl = document.querySelector("#enter-score");
let inputEl = document.querySelector("#user-input");
let submitBtn = document.querySelector("#submit");
let endQuiz = false;
let timeLeft = 60;
let score = 0;
let current = 0;
var highScores = [];
var shuffledQuestions = [];
var shuffledAnswers = [];

const questions = [
  {
    text: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correct: "alerts",
  },
  {
    text: "The condition in an if / else statement is enclosed within _____.",
    answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correct: "parentheses",
  },
  {
    text: "Arrays in JavaScript can be used to store:",
    answers: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of these",
    ],
    correct: "all of these",
  },
  {
    text: "String values must be enclosed within _____ and when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parentheses"],
    correct: "quotes",
  },
  {
    text: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    correct: "console.log",
  },
];

// Timer function ends quiz if time runs out
const setTimer = () => {
  timerEl.textContent = "Time: " + timeLeft;
  var timerInterval = setInterval(function () {
    timeLeft--;
    if (timeLeft >= 0) {
      timerEl.textContent = "Time: " + timeLeft;
    }
    if (timeLeft === 0 || timeLeft < 0) {
      endQuiz = true;
      if (endQuiz) {
        quizOver();
      }
      clearInterval(timerInterval);
    }
  }, 1000);
};

// Used to shuffle questions and answers
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var mix = Math.floor(Math.random() * (i + 1));
    [array[i], array[mix]] = [array[mix], array[i]];
  }
  return array;
}

function runQuiz() {
  // If there are no more questions, ends the quiz
  if (current === questions.length || endQuiz) {
    if (timeLeft > 0) {
      score = timeLeft;
    } else {
      score = 0;
    }
    quizOver();
    return;
  }

  // Decides which question is current and shuffles answer choices
  var currentQuestion = shuffledQuestions[current];
  shuffledAnswers = shuffle(currentQuestion.answers);

  // Dynamically creates and appends question text and empty ul to page
  var questionEl = document.createElement("h2");
  var answersEl = document.createElement("ul");
  questionEl.textContent = currentQuestion.text;
  quizEl.appendChild(questionEl);
  quizEl.appendChild(answersEl);

  // For each answer choice, creates a new li and appends them to the page
  for (var i = 0; i < shuffledAnswers.length; i++) {
    var choice = document.createElement("li");
    choice.textContent = shuffledAnswers[i];
    answersEl.appendChild(choice);
  }
}

// Decides if chosen answer is correct and adjusts time, then moves to next question
function answerSelected(event) {
  if (event.target.matches("li")) {
    if (event.target.textContent === shuffledQuestions[current].correct) {
      timeLeft += 10;
      results.textContent = "Correct!";
      setTimeout(function () {
        results.textContent = "";
      }, 1000);
    } else {
      timeLeft -= 15;
      results.textContent = "Wrong!";
      setTimeout(function () {
        results.textContent = "";
      }, 1000);
    }
    quizEl.innerHTML = "";
    current++;
    runQuiz();
  }
}

// Changes display to Enter Score input
function quizOver() {
  timerEl.setAttribute("style", "display: none");
  quizEl.setAttribute("style", "display: none");
  scoreDisplayEl.setAttribute("style", "display: inline-block");
  scoreEl.textContent = "Final Score: " + score;
  endQuiz = false;
}

// Starts the quiz
function startQuiz(event) {
  event.preventDefault();
  startPageEl.setAttribute("style", "display: none");
  quizEl.setAttribute("style", "display: inline-block");
  shuffledQuestions = shuffle(questions);
  setTimer();
  runQuiz();
}

startBtnEl.addEventListener("click", startQuiz);
quizEl.addEventListener("click", answerSelected);

// Saves score and input initials to local storage, alerts if no input
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (localStorage.getItem("scores")) {
    highScores = JSON.parse(localStorage.getItem("scores"));
  }

  if (inputEl.value) {
    var initials = inputEl.value;
    var finalScore = {
      initials: initials,
      score: score,
    };
    highScores.push(finalScore);
    localStorage.setItem("scores", JSON.stringify(highScores));
    location.href = "highscores.html";
  } else {
    alert("You haven't entered your initials yet!");
  }
});
