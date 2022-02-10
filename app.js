// const para = document.createElement("p");
// para.innerText = "This is a paragraph";
// document.body.appendChild(para);
const container = document.querySelector(".container");
const alphabetContainer = document.querySelector(".alphabet-container");

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
const nameDiv = document.createElement("div");
nameDiv.className = "name-div";
imageDiv.insertAdjacentElement("afterend", nameDiv);

let randomName = "";
let firstName = [];
let lastName = [];
let space = [" "];

function getRandomName() {
  const i = Math.floor(Math.random() * names.length);
  randomName = names[i];
  names.splice(i, 1);
  return randomName;
}

function appendLetterDivs(array) {
  array.forEach((letter) => {
    const div = document.createElement("div");
    div.innerText = letter;
    nameDiv.appendChild(div);
    div.className = "name-letter";
  });
}

function letterCount() {
  firstName = randomName.split(" ")[0].split("");
  lastName = randomName.split(" ")[1].split("");
  appendLetterDivs(firstName);
  appendLetterDivs(space);
  appendLetterDivs(lastName);
}

function clearNameDiv() {
  nameDiv.innerHTML = "";
}

const generatorButton = document.querySelector("#generator");
generatorButton.addEventListener("click", () => {
  clearNameDiv();
  getRandomName();
  letterCount();
});
