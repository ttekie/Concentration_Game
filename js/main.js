$(document).ready(function() {
  let audio = new Audio('assets/click.wav');
  let resetButton = document.getElementById("reset-button");
  let colors = ["aqua", "bisque", "blue", "blueviolet",
                "brown", "cadetblue", "chartreuse",
                "chocolate","coral", "cornflowerblue"];

  // game square will listen for click events
  function GameSquare(el, color) {
    this.el = el;
    this.isOpen = false;
    this.isLocked = false;
    this.el.addEventListener("click", this, false);
    this.setColor(color);
  }  // end function GameSquare
  // event handler
  GameSquare.prototype.handleEvent = function(e) {
    switch (e.type) {
      case "click":
        if (this.isOpen || this.isLocked) {
          return;
        }
        audio.play();
        this.isOpen = true;
        this.el.classList.add('flip');
        checkGame(this);   // check the game here
    }
  }
  GameSquare.prototype.reset = function() {
    this.isOpen = false;
    this.isLocked = false;
    this.el.classList.remove('flip');
  }
  GameSquare.prototype.lock = function() {
    this.isLocked = true;
    this.isOpen = true;
  }
  GameSquare.prototype.setColor = function(color) {
    this.color = color;
    this.el.children[0].children[1].classList.remove(this.color);
    this.el.children[0].children[1].classList.add(color);
  }

  let gameSquares = [];
    // setup the game
function setupGame() {
  let array = document.getElementsByClassName("game-square");
    // Get the array of 8 random color pairs
  let randomColors = getSomeColors();
  for (let i = 0; i < array.length; i++) {
      // Get a random index
    let index = random(randomColors.length);
      // Get the color at that index
    let color = randomColors.splice(index, 1)[0];
      // Use that color to initialize the GameSquare
    gameSquares.push(new GameSquare(array[i], colors));
  }
}   // end function setupGame

function random(n) {
  return Math.floor(Math.random() * n);
}  // end function random

function getSomeColors() {
  let colorscopy = colors.slice();
  let randomColors = [];
  for (let i = 0; i < 8; i++) {
    let index = random(colorscopy.length);
    randomColors.push(colorscopy.splice(index, 1)[0]);
  }
  return randomColors.concat(randomColors.slice());
}  // end function getSomeColors

let firstSquare = null;

function checkGame(gameSquare) {
  if (firstSquare === null) {
    firstSquare = gameSquare;
    return;
  }

  if (firstSquare.color === gameSquare.color) {
    firstSquare.lock();
    gameSquare.lock();
  } else {
    let a = firstSquare;
    let b = gameSquare;
    setTimeout(function() {
      a.reset();
      b.reset();
      firstSquare = null;
    }, 400);
  }
  firstSquare = null;
}  // end function checkGame

function randomizeColors() {
  let randomColors = getSomeColors();
  gameSquares.forEach(function(gameSquare) {
    let color = randomColors.splice(random(randomColors.length), 1)[0];
    gameSquare.setColor(color);
  });
}  // end function randomizeColors

function clearGame() {
  gameSquares.forEach(function(gameSquare) {
    gameSquare.reset();
  });
  setTimeout(function() {
    randomizeColors();
  }, 500);
}

  setupGame();  //invoke setupGame
  clearGame();  // invoke clearGame

});
