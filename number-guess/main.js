document.addEventListener("DOMContentLoaded", function () {
  let guess = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;
  let previousGuesses = [];
  let bestScore = localStorage.getItem("bestScore") || Infinity;
  const value = document.querySelector(".form-control");
  const message = document.getElementById("message");
  const attemptsDisplay = document.getElementById("attempts");
  const scoreDisplay = document.getElementById("scores");
  const previousGuessDisplay = document.getElementById("previousGuesses");

  bestScore !== Infinity
    ? (scoreDisplay.textContent = `Best scores: ${bestScore} attempts`)
    : (scoreDisplay.textContent = `Best Score: N/A`);
  document.addEventListener("click", function (e) {
    if (e.target.matches(".check-guess")) {
      const userGuess = parseInt(value.value, 10);
      if (!isNaN(userGuess)) {
        previousGuesses.push(userGuess);
        previousGuessDisplay.textContent = `Previous Guesses: ${previousGuesses.join(
          ", "
        )}`;
        attempts++;
        attemptsDisplay.innerHTML = `Attempts: ${attempts}`;
      }
      if (isNaN(userGuess)) {
        message.innerHTML = "Please enter a guess";
      } else if (userGuess > guess) {
        message.innerHTML = "Message: Too high";
      } else if (userGuess === guess) {
        message.innerHTML = "Message: correct guess";

        if (attempts < bestScore) {
          bestScore = attempts;
          localStorage.setItem("bestScore", bestScore);
          scoreDisplay.textContent = `Best Score ${bestScore}`;
        }
      } else {
        message.innerHTML = "Message: Too low just go home";
      }
    }
  });
  document.addEventListener("click", function (e) {
    if (e.target.matches("#reset")) {
      attempts = 0;
      previousGuesses = [];
      guess = Math.floor(Math.random() * 100) + 1;
      value.value = "";
      value.disabled = false;
      previousGuessDisplay.textContent = "Previous Guesses: ";
      message.innerHTML = "";
      attemptsDisplay.innerHTML = "";
      document.querySelector(".check-guess").disabled = false;
      bestScore = Infinity;
      localStorage.removeItem("bestScore");
      scoreDisplay.textContent = "Best Score: N/A";
    }
  });
});
