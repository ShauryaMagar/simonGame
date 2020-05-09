var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(250).fadeOut(250).fadeIn(250);
  playSound(randomChosenColour);
}

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id"); //Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});



function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel]== gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {


      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {


    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();



  }
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}



function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
