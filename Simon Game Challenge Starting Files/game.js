var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isFirstTime = true;

function nextSequence() {
  $("#level-title").text("Level " + level);
  var randomVariable = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColors[randomVariable];
  gamePattern.push(randomChosenColour);

  animateButton(randomChosenColour);
  playSound(randomChosenColour);

  // level++;
}

function playSound(fileName) {
  var audio = new Audio("sounds/" + fileName + ".mp3");
  audio.play();
}

function animateButton(buttonId) {
  // $("#" + buttonId)
  //   .animate({ opacity: 0 }, "fast")
  //   .animate({ opacity: 1 }, "fast");
  $("#" + buttonId).addClass("pressed");
  setTimeout(function () {
    $("#" + buttonId).removeClass("pressed");
  }, 100);
}

$(".btn").on("click", function (event) {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animateButton(userChosenColour);
  playSound(userChosenColour);

  console.log("game pattern: " + gamePattern);
  console.log("userclicked Patter: " + userClickedPattern);

  if (userClickedPattern.length == level + 1) {
    checkAnswer(level);
    userClickedPattern = [];
  }
});

$(document).on("keydown", function (event) {
  level = 0;
  if (isFirstTime) {
    isFirstTime = false;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (checkSequence(gamePattern, userClickedPattern)) {
    level++;
    console.log("isCorrect");
    nextSequence();
  } else {
    startOver();
  }
}

function startOver() {
  $("body").addClass("game-over");
  playSound("wrong");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);
  gamePattern = [];
  userClickedPattern = [];
  isFirstTime = true;
  $("#level-title").text("Press A Key to Start");
}

function checkSequence(arr1, arr2) {
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
