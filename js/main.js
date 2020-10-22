$(document).ready(function() {

  var resetButton = document.getElementById("reset-button");
  var colors = [];
  for (var i = 0; i < 10; i++) {
    colors.push('square-' + i);
  }
  // game square will listen for click events
  function GameSquare(el, color) {
    this.el = el;
    this.isOpen = false;
    this.isLocked = false;
    this.el.addEventListener("click", this, false);
    this.setColor(color);
  }
  // event handler
  GameSquare.prototype.handleEvent = function(e) {
    switch (e.type) {
      case "click":
        if (this.isOpen || this.isLocked) {
          return;
        }
        this.isOpen = true;
        this.el.classList.add('flip');
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
    this.el.children[0].children[1].classList.remove(this.color);
    this.color = color;
    this.el.children[0].children[1].classList.add(color);
  }

});
