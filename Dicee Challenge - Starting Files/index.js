var randomNumber1 = Math.floor(Math.random() * 6) + 1;
const firstImageEl = document.querySelector(".img1");
firstImageEl.setAttribute("src", "images/dice" + randomNumber1 + ".png");

var randomNumber2 = Math.floor(Math.random() * 6) + 1;
const secondImageEl = document.querySelector(".img2");
secondImageEl.setAttribute("src", "images/dice" + randomNumber2 + ".png");

var headingEl = document.querySelector("h1");
if (randomNumber1 >= randomNumber2) {
  if (randomNumber1 === randomNumber2) headingEl.textContent = "Draw!";
  else headingEl.textContent = "Player1 Won!!";
} else {
  headingEl.textContent = "Player2 Won!!";
}
console.log(headingEl);
