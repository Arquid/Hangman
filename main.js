const hiddenWord = document.querySelector(".word");
const btn = document.querySelector(".guessBtn");
const guess = document.querySelector(".quess");
const gLetters = document.querySelector(".quessedLetters");
const info = document.querySelector(".info");
const newGame = document.querySelector(".newGame");
const counterText = document.querySelector(".counter");

// hangman words
const words = ["basketball", "mustache", "economist", "developer"];

// change word to ****
let answerWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = "*".repeat(answerWord.length).split("");

let guessCounter = 5;
let lettersFound = 0;
let gLetterArr = [];

newGame.style.display = "none";
guess.focus();
hiddenWord.textContent = guessedWord.join("");
counterText.textContent = "Guesses left: " + guessCounter;

function checkLetter() {
  // check dublicates
  if(gLetterArr.includes(guess.value.toUpperCase())) {
    infoText("Letter already given");
  } 
  // if input not letter then info it
  else if(!guess.value.match(/[a-zöäå]/i) || guess.value.length > 1) {
    infoText("Give letter!");
  } 
  else {
    for(let i=0; i<answerWord.length; i++) {
      if(guess.value.toLowerCase() === answerWord[i]) { 
        guessedWord[i] = guess.value;
        lettersFound++; 
      }
    } 
  
  // show guessed letters
  gLetterArr.push(guess.value.toUpperCase());
  gLetters.textContent = "Given letters: " + gLetterArr.join(" ").toUpperCase();
  // clear input
  guess.value = ""; 
  // update hiddenword
  hiddenWord.textContent = guessedWord.join("").toUpperCase();
  }
}

// show info text if something goes wrong
function infoText(text) {
  info.textContent = text;
  guess.value = "";
  lettersFound = 1;
  setTimeout(function() {
    info.textContent = "";
  }, 3000);
}

btn.addEventListener("click", function() {
  checkLetter();
  // if find all letters then win game
  if(answerWord === guessedWord.join("")) {
    info.style.color = "green";
    info.textContent = "You won!";
    btn.style.display = "none";
    newGame.style.display = "table-cell";
    guess.disabled = true;
  }
  
  // if letters not found in word guessCounter -1 
  if(lettersFound === 0) {
    guessCounter--;
    counterText.textContent = "Guesses left: " + guessCounter;
    lettersFound = 0;
    // if guessCounter = 0 then lose game
    if(guessCounter === 0) {
      info.textContent = "You lose!";
      btn.style.display = "none";
      newGame.style.display = "table-cell";
      guess.disabled = true;
    }
  } else {
    lettersFound = 0;
  }
  guess.focus();
});

// event to start newgame
newGame.addEventListener("click", function() {
  answerWord = words[Math.floor(Math.random() * words.length)];
  guessedWord = "*".repeat(answerWord.length).split("");

  guessCounter = 5;
  lettersFound = 0;
  gLetterArr = [];

  newGame.style.display = "none";
  btn.style.display = "table-cell";
  hiddenWord.textContent = guessedWord.join("");
  gLetters.textContent = "";
  info.textContent = "";
  info.style.color = "red";
  guess.disabled = false;
  guess.focus();
  gLetters.textContent = "Given letters: " + gLetterArr.join(" ").toUpperCase();
  counterText.textContent = "Guesses left: " + guessCounter;
})