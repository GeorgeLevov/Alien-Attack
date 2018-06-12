(function(){
  //game variables
  var alienX = 70;
  var alienY = 20;
  var guessX = 0;
  var guessY = 0;
  var shotsRemaining = 8;
  var shotsMade = 0;
  var gameState ="";
  var gameWon = false;


  //game objects

  var cannon = document.querySelector("#cannon");
  var alien = document.querySelector("#alien");
  var missile = document.querySelector("#missile");
  var explosionAlien = document.querySelector("#explosion");
  var explosionCannon = document.querySelector("#explosion2");

  // i/o fields

  var inputX = document.querySelector("#inputX");
  var inputY = document.querySelector("#inputY");
  var output = document.querySelector("#output");

  //button input

  var button = document.querySelector("button");
  button.addEventListener("click", buttonHandler, false);

  //enter key input
  window.addEventListener("keydown", keydownHandler, false);

  function keydownHandler(e){
    if (e.keyCode === 13){
      validateInput();
    }
  }

  function buttonHandler(){
    validateInput();
  }

  function validateInput(){
 var guessX = parseInt(inputX.value);
 var guessY = parseInt(inputY.value);
 console.log("Shot value X:"+guessX);
 console.log("Shot value Y:"+guessY);

    if(isNaN(guessX) || isNaN(guessY)){
      output.innerHTML = "Coordinates are from 0 - 300 soldier, make it happen!";
    }
    else if(guessX > 300 || guessY > 300){
      output.innerHTML = "Those coordinates are not on the map soldier!";
    }
    else{
      render();
    }
  }

    function render(){
      var guessX = parseInt(inputX.value);
      var guessY = parseInt(inputY.value);
      if (!gameWon){
          alienX = Math.floor((Math.random() * 281) );
          alienY = (alienY + 30);
        }
      //position alien and explosion
      alien.style.left = alienX + "px";
      alien.style.top = alienY + "px";

      explosionAlien.style.left = alienX + "px";
      explosionAlien.style.top = alienY + "px";

      //position cannon
      cannon.style.left = guessX + "px";
      explosionCannon.style.left = guessX + "px";
      //position missile
      missile.style.left = guessX + "px";
      missile.style.top = guessY + "px";

      playGame();
    }

    function playGame(){
      shotsRemaining = shotsRemaining -1;
      shotsMade = shotsMade +1;
      gameState = " Shots: "+ shotsMade + ", Remaining: " + shotsRemaining;

      var guessX = parseInt(inputX.value);
      var guessY = parseInt(inputY.value);
      console.log("Alien value X:"+alienX);
      console.log("Alien value Y:"+alienY);

      if (guessX >= alienX && guessX <= (alienX+20)){

        if (guessY >= alienY && guessY<= (alienY +20)){
          gameWon = true;
          endGame();
          }
      }
      else{
        output.innerHTML = "Miss!<br/>" + gameState + "<br/>Try arain soldier!";
      }

        if (shotsRemaining < 1){
            endGame();
        }
      }

  function endGame(){


    if (gameWon){
      explosionAlien.style.display ="block";
      alien.style.display = "none";
      missile.style.display = "none";
      output.innerHTML = "You got him!<br/> It only took you: " + shotsMade + " shots.";

    }
    else{
      explosionCannon.style.display ="block";
      cannon.style.display = "none";
      missile.style.display = "none";
      output.innerHTML = "Game over!<br/>The alien has invaded and destroyed you";
    }

    //disable button input
    button.removeEventListener("click", buttonHandler, false);
    button.disabled = true;

    //disable enter key input
    window.removeEventListener("keydown", keydownHandler, false);

    //disable input field
    inputX.disabled = true;
    inputY.disabled = true;
  }


  }());
