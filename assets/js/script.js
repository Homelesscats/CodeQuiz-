const timerEl = document.querySelector("#timer");
const quizEl = document.querySelector("#quiz");
const startPageEl = document.querySelector("#start");
const startBtnEl = document.querySelector("#start-button");
const inputEl = document.querySelector("#user-input");
const results = document.querySelector("#results");
const submitBtn = document.querySelector("#submit");

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

alert("Welcome to the Coding Quiz Challenge! Press OK to begin.");
