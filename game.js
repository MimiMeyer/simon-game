//variables
var buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var started = false;

//game is started by pressing the start button
$(".start-btn").click(function() {
  if (!started) {

    $(".start-btn").fadeToggle();
    setTimeout(function() {
      nextSequence();
    }, 1000);

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

    $("#level-title").text("Game Over, Press Restart to start!");

    startOver();

  }
}


//produce the next button in the pattern
function nextSequence() {
  userClickedPattern = []; // user pattern restarted
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playPattern();


}




//show the pattern to the user
function playPattern() {
  var i = 0;
  const intervalId = setInterval(function() {
    $("#"+gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);
    i ++;
    if (i === gamePattern.length) {//if we got to the end of the array stop the iterval
        clearInterval(intervalId);
      }
    }, 1000);
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
  $(".start-btn").text("Restart").fadeToggle();

}
