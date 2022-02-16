import names from "./names.js";

// const container = document.querySelector(".container");
const alphabetContainer = document.querySelector(".alphabet-container");
const image = document.getElementById("image");
// const imageDiv = document.querySelector(".images");
const nameDiv = document.querySelector(".name-div");
// const nameSpace = document.querySelectorAll(".name-letter");
// const generatorButton = document.querySelector("#generator");
const startButton = document.getElementById("start-button");
const modal = document.getElementById("modal-background");
const modalWin = document.getElementById("modal-background-win");
const mistakesDiv = document.getElementById("mistakes");
const playAgainButton = document.getElementById("play-again");
const playAgainButtonWin = document.getElementById("play-again-win");
const winLooseDiv = document.getElementById("win-loose-count");

let randomName = "";
let firstName = [];
let lastName = [];
let space = [" "];
let countMistakes = 0;
let pickedLetter = "";
let clicked;
let winCount = 0;
let looseCount = 0;
let playedCount = 0;

let gameStarted = false;
let nameGenerated = false;

const alphabetArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const alphabetDiv = document.createElement("div");
alphabetDiv.className = "alphabet";
alphabetContainer.appendChild(alphabetDiv);

alphabetArray.forEach((el) => {
  const div = document.createElement("div");
  div.innerText = el;
  alphabetDiv.appendChild(div);
  div.className = "letter";
});

const letterButtons = document.querySelectorAll(".letter");

alphabetDiv.style.visibility = "hidden";

function getRandomName() {
  const i = Math.floor(Math.random() * names.length);
  randomName = names[i];
  names.splice(i, 1);
  return randomName;
}

function appendLetterDivs(array, className) {
  array.forEach((letter) => {
    const div = document.createElement("div");
    div.innerText = letter;
    nameDiv.appendChild(div);
    div.className = className;
  });
}

function letterCount() {
  firstName = randomName.split(" ")[0].split("");
  lastName = randomName.split(" ")[1].split("");
  appendLetterDivs(firstName, "name-letter-hidden");
  appendLetterDivs(space, "name-space");
  appendLetterDivs(lastName, "name-letter-hidden");
}

function clearNameDiv() {
  nameDiv.innerHTML = "";
}

function startImage() {
  image.src = "src/start-image.jpeg";
}

function winImage() {
  image.src = "src/win-image.jpeg";
}

function switchImages() {
  if (countMistakes > 0 && countMistakes < 8)
    image.src = `src/mistake${countMistakes}.jpeg`;
}

function hideElement(element) {
  element.style.display = "none";
}

// function showElement(element) {
//   element.style.display = "inline";
// }

function startButtonLogic() {
  generateName();
  gameStarted = true;
  hideElement(startButton);
  alphabetDiv.style.visibility = "visible";
}

function showModalLoose(isTrue) {
  let show = isTrue;
  if (show === true) modal.style.display = "inline";
  if (show === false) modal.style.display = "none";
}

function showModalWin(isTrue) {
  let show = isTrue;
  if (show === true) modalWin.style.display = "inline";
  if (show === false) modalWin.style.display = "none";
}

function handleLoosing(arr) {
  if (countMistakes === 7) {
    showModalLoose(true);
    looseCount++;
    showWinLooseCount();
    arr.forEach((el) => {
      el.className = "name-letter";
    });
  }
}

function handleWinning(array) {
  if (array[1] === undefined) {
    showModalWin(true);
    winCount++;
    showWinLooseCount();
    winImage();
  }
}

function showWinLooseCount() {
  playedCount++;
  console.log(winCount, looseCount, playedCount);
  winLooseDiv.innerText = `Wins : ${winCount} / Losses : ${looseCount} / Played : ${playedCount}`;
}

function resetRound() {
  console.log("Game reseted");
  countMistakes = 0;
  gameStarted = true;
  generateName();
  showModalLoose(false);
  showModalWin(false);
  isLetterPicked(null, false);
}

function generateName() {
  nameGenerated = true;
  startImage();
  clearNameDiv();
  getRandomName();
  letterCount();
  // hideElement(generatorButton);
}

// hideElement(generatorButton);
// generatorButton.addEventListener("click", generateName);
startButton.addEventListener("click", startButtonLogic);

playAgainButton.addEventListener("click", () => {
  resetRound();
});

playAgainButtonWin.addEventListener("click", () => {
  resetRound();
});

function isLetterPicked(ev, isPicked) {
  if (isPicked === true) {
    pickedLetter = ev.currentTarget;
    pickedLetter.className = "letter-picked";
  }
  if (isPicked === false) {
    pickedLetter = "";
    letterButtons.forEach((element) => (element.className = "letter"));
  }
}

letterButtons.forEach((element) => {
  element.addEventListener("click", (event) => {
    clicked = false;
    if (clicked === false && gameStarted === true && nameGenerated === true) {
      isLetterPicked(event, true);

      const nameArray = document.querySelectorAll(".name-letter-hidden");
      let mistake = [];
      nameArray.forEach((el) => {
        if (el.innerText === pickedLetter.innerText) {
          el.className = "name-letter";
          mistake.push(false);
        } else {
          mistake.push(true);
        }
      });

      if (!mistake.includes(false)) {
        countMistakes++;
        switchImages();
      }
      clicked = true;

      mistakesDiv.innerText = `Mistakes made ${countMistakes} / 7`;

      handleLoosing(nameArray);
      handleWinning(mistake);
    }
  });
});
