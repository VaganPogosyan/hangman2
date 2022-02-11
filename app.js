// const para = document.createElement("p");
// para.innerText = "This is a paragraph";
// document.body.appendChild(para);
const container = document.querySelector(".container");
const alphabetContainer = document.querySelector(".alphabet-container");
const image = document.getElementById("image");

const names = [
  "BRAD PITT",
  "JACKIE CHAN",
  "SCARLET JOHANSON",
  "WILL SMITH",
  "MICHAEL KEATON",
  "DENZEL WASHINGTON",
  "JOQAUIN PHOENIX",
  "ORLANDO BLOOM",
  "JENNIFER ANNISTON",
  "MONICA BELUCCI",
  "ANGELINA JOLIE",
  "JASON STATHAM",
  "TOM HOLLAND",
  "CHRIS PRATT",
  "ANDREW GARFIELD",
];

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

const imageDiv = document.querySelector(".images");
const nameDiv = document.querySelector(".name-div");

let randomName = "";
let firstName = [];
let lastName = [];
let space = [" "];
let countMistakes = 0;

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

function toggleClass(element, class1, class2) {
  if (element.className === class1) element.className = class2;
  // if (element.className === class2) element.className = class1;
}

function startImage() {
  image.src = "src/start-image.jpeg";
}

const nameSpace = document.querySelectorAll(".name-letter");

const generatorButton = document.querySelector("#generator");
generatorButton.addEventListener("click", () => {
  startImage();
  clearNameDiv();
  getRandomName();
  letterCount();
});

const letterButton = document.querySelectorAll(".letter");
let pickedLetter = "";

function pickLetter(event) {
  pickedLetter = event.currentTarget.innerText;
  checkLetter();
  console.log("You picked " + pickedLetter);
}

function siwtchImages() {
  if (countMistakes > 0) {
    image.src = `src/mistake${countMistakes}.jpeg`;
  }
}

letterButton.forEach((element) => {
  let clicked = false;
  element.addEventListener("click", (event) => {
    if (clicked === false) {
      pickedLetter = event.currentTarget;
      pickedLetter.className = "letter-picked";
      console.log("You picked " + pickedLetter.innerText);

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
        console.log("Mistakes " + countMistakes);
      }
      clicked = true;
    }
  });
});
