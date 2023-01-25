const allBtnEls = document.querySelectorAll("button");

for (let i = 0; i < allBtnEls.length; i++) {
  allBtnEls[i].addEventListener("click", handleClick);
}

function handleClick(event) {
  console.log("I've been clicked");
  const newVar = this.innerHTML;
  playSound(newVar);
  buttonAnimation(newVar);
}

document.addEventListener("keydown", function (event) {
  playSound(event.key);
  buttonAnimation(event.key);
});

function playSound(key) {
  switch (key) {
    case "w":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;
    case "a":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;
    case "s":
      var kick = new Audio("sounds/kick-bass.mp3");
      kick.play();
      break;
    case "d":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;
    case "j":
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;
    case "k":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;
    case "l":
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;

    default:
      console.log("Not a valid key");
      break;
  }
}

function buttonAnimation(currKey) {
  var el = document.querySelector("." + currKey);
  el.classList.toggle("pressed");
  setTimeout(() => {
    el.classList.toggle("pressed");
  }, 100);
}
