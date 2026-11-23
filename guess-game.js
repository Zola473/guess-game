let targetNumber = 0;
let attempts = 0;
const maxAttempts = 5;
let gameOver = false;

const guessInput = document.getElementById("guess-value");
const guessBtn = document.getElementById("guess-btn");
const restartBtn = document.getElementById("restart-btn");
const attemptDisplay = document.getElementById("attempt");
const resultDisplay = document.getElementById("result");

function isNumeric(value) {
  return value.trim() !== "" && !isNaN(Number(value));
}

function initGame() {
  targetNumber = Math.floor(Math.random() * 20) + 1;
  attempts = 0;
  gameOver = false;

  attemptDisplay.textContent = attempts;
  resultDisplay.textContent = "";

  guessInput.value = "";
  guessInput.disabled = false;
  guessBtn.disabled = false;
  guessInput.focus();
}

function handleGuess() {
  if (gameOver) return;

  const rawValue = guessInput.value;

  if (!isNumeric(rawValue)) {
    guessInput.focus();
    return;
  }

  const userGuess = Number(rawValue);
  attempts++;
  attemptDisplay.textContent = attempts;

  if (userGuess === targetNumber) {
    gameOver = true;
    resultDisplay.textContent = `Congratulations! You WIN! You guessed ${targetNumber} in ${attempts} attempt(s).`;
    guessBtn.disabled = true;
    guessInput.disabled = true;
  } else if (attempts >= maxAttempts) {
    gameOver = true;
    resultDisplay.textContent = `You LOSE! The number was ${targetNumber}.`;
    guessBtn.disabled = true;
    guessInput.disabled = true;
  } else if (userGuess > targetNumber) {
    resultDisplay.textContent = `${userGuess} is too high`;
    guessInput.value = "";
    guessInput.focus();
  } else {
    resultDisplay.textContent = `${userGuess} is too low`;
    guessInput.value = "";
    guessInput.focus();
  }
}

guessBtn.addEventListener("click", handleGuess);
restartBtn.addEventListener("click", initGame);

guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleGuess();
  }
});

window.addEventListener("DOMContentLoaded", initGame);