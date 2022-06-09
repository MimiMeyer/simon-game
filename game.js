//variables
var buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var started = false;

//game is started by pressing a key
$(document).keydown(function() {
  if (!started) {
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
  }
});

//button clicked
$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1); //index of where the user is up too
});


//check if the users clicks are corret
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //user has completed the pattern successfully
    if (userClickedPattern.length === gamePattern.length) {
      $("#level-title").text("Good Job!");
      setTimeout(nextSequence, 1000); //start the next sequence
    }
  } else {
    playSound("wrong")
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    startOver();
  }
}


//show the user the next button he needs to press
function nextSequence() {
  userClickedPattern = []; // user pattern restarted
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //flash
  playSound(randomChosenColour);


}


//plays sounds of the buttons
function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


//when button is pressed becomes grey
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//restart game
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];

}
