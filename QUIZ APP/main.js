// create an array of questions [{q, options[1,2,3,4], score}, {q, options[1,2,3,4], score}, {q, options[1,2,3,4], score}]
"use strict";
const questions = [
  {
    q: "what is your fluffy name",
    options: ["David", "kang kang", "weapon", "Aroo"],
    correct: 0,
  },
  {
    q: "where do you come from",
    options: ["Kiambu", "Nyeri", "witeithie", "Sugoi"],
    correct: 1,
  },
  {
    q: "how old are you buddy?",
    options: [19, 20, 22, 45],
    correct: 2,
  },
  {
    q: "how many are you in your family",
    options: [2, 3, 4, 6],
    correct: 3,
  },
];

// track which question and score also lock question to prevent double answers;
let index = 0;
let score = 0;
let locked = false;
// Grab elements from the HTML
const questionEl = document.getElementById("question");
const optionWrap = document.querySelector(".options");
const optionBtn = optionWrap.querySelectorAll(".option-btn");
const nextBtn = document.querySelector(".next-btn");
const scoreBox = document.getElementById("scoreContainer");
const scoreEl = document.getElementById("score");

// attach listeners to all options
optionBtn.forEach((btn, i) => {
  btn.addEventListener("click", () => handleAnswer(i));
});

function loadQuestion() {
  locked = false;
  nextBtn.style.display = "none";

  const { q, options } = questions[index];
  questionEl.textContent = q;

  optionBtn.forEach((btn, i) => {
    btn.disabled = false;
    btn.classList.remove("correct", "wrong");
    btn.textContent = options[i];
  });
}

// HANDLE ANSWER: mark correct/wrong, update the score and reveal Next
function handleAnswer(selectedIndex) {
  if (locked) return;
  locked = true;

  const correctIndex = questions[index].correct;
  if (selectedIndex === correctIndex) score++;

  optionBtn.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) btn.classList.add("correct");
    if (i === selectedIndex && i !== correctIndex) btn.classList.add("wrong");
  });

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  index++;
  if (index < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.querySelector(".quiz-container h2").textContent = "Quiz Finished";
  optionWrap.innerHTML = "";
  nextBtn.style.display = "none";

  scoreEl.textContent = `${score} / ${questions.length}`;
  scoreBox.style.display = "block";
}

loadQuestion();
