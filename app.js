// const para = document.createElement("p");
// para.innerText = "This is a paragraph";
// document.body.appendChild(para);

const container = document.querySelector(".container");
const alphabetContainer = document.querySelector(".alphabet-container");

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
