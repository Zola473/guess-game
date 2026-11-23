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
  resultDisplay.className = "";

  guessInput.value = "";
  guessInput.disabled = false;
  guessBtn.disabled = false;
  guessInput.focus();
}

function handleGuess() {
  if (gameOver) return;

  const rawValue = guessInput.value;

  // Ignore empty or non-numeric inputs
  if (!isNumeric(rawValue)) {
    guessInput.focus();
    return;
  }

  const userGuess = Number(rawValue);
  attempts++;
  attemptDisplay.textContent = attempts;

  if (userGuess === targetNumber) {
    gameOver = true;
    resultDisplay.textContent = `🎉 Congratulations! You WIN! You guessed the number ${targetNumber} in ${attempts} attempt(s)!`;
    resultDisplay.className = "result-win";
    guessBtn.disabled = true;
    guessInput.disabled = true;
  } else if (attempts >= maxAttempts) {
    gameOver = true;
    resultDisplay.textContent = `You LOSE! You used all 5 attempts. The secret number was ${targetNumber}.`;
    resultDisplay.className = "result-lose";
    guessBtn.disabled = true;
    guessInput.disabled = true;
  } else if (userGuess > targetNumber) {
    resultDisplay.textContent = `${userGuess} is too high!`;
    resultDisplay.className = "result-hint";
    guessInput.value = "";
    guessInput.focus();
  } else {
    resultDisplay.textContent = `${userGuess} is too low!`;
    resultDisplay.className = "result-hint";
    guessInput.value = "";
    guessInput.focus();
  }
}

guessBtn.addEventListener("click", handleGuess);
restartBtn.addEventListener("click", initGame);

// Allow pressing Enter inside the input field to submit a guess
guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleGuess();
  }
});

// Start the game automatically on page load
window.addEventListener("DOMContentLoaded", initGame);