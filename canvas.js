/**
 * A BeakerCanvas takes in an HTML element that is a <canvas> and provides all of the necessary
 * functionality to be drawn on.
 */
let BeakerCanvas = function(canvas) {
  let _ = this;
  _.canvas = canvas;
  _.c = canvas.getContext('2d', {
    alpha: true,
  });

  // holds important values about the current state of the cursor
  // in relation to this canvas
  _.cursor = {
    leftClick: false,
    rightClick: false,
    oldX: 0,
    oldY: 0,
    x: 0,
    y: 0,
  };

  /**
   * Takes in a MouseEvent and updates this canvas's cursor object values based on it.
   */
  function updateCursor(mouseEvent) {
    _.cursor.leftClick = mouseEvent.buttons % 2 >= 1;
    _.cursor.rightClick = mouseEvent.buttons % 4 >= 2;
    _.cursor.oldX = _.cursor.x;
    _.cursor.oldY = _.cursor.y;
    _.cursor.x = mouseEvent.offsetX;
    _.cursor.y = mouseEvent.offsetY;
  }

  function drawLine(x1, y1, x2, y2, drawFunction) {
    let distance = Math.floor(Math.hypot(x2 - x1, y2 - y1));
    _.c.save();
    for(let i = 0; i <= distance; i++) {
      let x = Math.round(x1 + (x2 - x1) * (i / distance));
      let y = Math.round(y1 + (y2 - y1) * (i / distance));
      drawFunction(x, y);
    }
    _.c.restore();
  }

  function drawPixel(x, y) {
    _.c.fillStyle = "#000";
    _.c.fillRect(x, y, 1, 1);
  }

  function erasePixel(x, y) {
    _.c.clearRect(x, y, 5, 5);
  }

  (function update() {
    // change a pixel (or several) at cursor if necessary
    if (_.cursor.leftClick) {
      drawLine(_.cursor.oldX, _.cursor.oldY, _.cursor.x, _.cursor.y, drawPixel);
    } else if (_.cursor.rightClick) {
      drawLine(_.cursor.oldX, _.cursor.oldY, _.cursor.x, _.cursor.y, erasePixel);
    }

    // loop the update method
    window.requestAnimationFrame(update);
  })();

  canvas.addEventListener("mousedown", updateCursor);
  canvas.addEventListener("mousemove", updateCursor);
  canvas.addEventListener("mouseup", updateCursor);
}

let canvas = document.getElementsByTagName('canvas')[0];
let beakerCanv = new BeakerCanvas(canvas);
