import names from "./names.js";

const container = document.querySelector(".container");
const alphabetContainer = document.querySelector(".alphabet-container");
const image = document.getElementById("image");
const imageDiv = document.querySelector(".images");
const nameDiv = document.querySelector(".name-div");
const nameSpace = document.querySelectorAll(".name-letter");
const generatorButton = document.querySelector("#generator");
const startButton = document.getElementById("start-button");
const modal = document.getElementById("modal-background");
const mistakesDiv = document.getElementById("mistakes");

let randomName = "";
let firstName = [];
let lastName = [];
let space = [" "];
let pickedLetter = "";
let countMistakes = 0;

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

generatorButton.addEventListener("click", () => {
  nameGenerated = true;
  startImage();
  clearNameDiv();
  getRandomName();
  letterCount();
});

// function pickLetter(event) {
//   pickedLetter = event.currentTarget.innerText;
//   checkLetter();
//   console.log("You picked " + pickedLetter);
// }

function siwtchImages() {
  if (countMistakes > 0 && countMistakes < 8)
    image.src = `src/mistake${countMistakes}.jpeg`;
}

function hideElement(element) {
  element.style.display = "none";
}

function showElement(element) {
  element.style.display = "inline";
}

hideElement(generatorButton);

function startButtonLogic() {
  gameStarted = true;
  hideElement(startButton);
  if (gameStarted === true) {
    showElement(generatorButton);
    alphabetDiv.style.visibility = "visible";
  } else {
    hideElement(generatorButton);
  }
}

function showModal() {
  modal.style.display = "inline";
}

function handleLoosing() {
  if (countMistakes === 7) {
    showModal();
  }
}

startButton.addEventListener("click", startButtonLogic);

letterButtons.forEach((element) => {
  let clicked = false;
  element.addEventListener("click", (event) => {
    if (clicked === false && gameStarted === true && nameGenerated === true) {
      pickedLetter = event.currentTarget;
      pickedLetter.className = "letter-picked";
      // console.log("You picked " + pickedLetter.innerText);

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
        siwtchImages();
      }
      mistakesDiv.innerText = `Mistakes made ${countMistakes} / 7`;

      handleLoosing();

      clicked = true;
    }
  });
});
