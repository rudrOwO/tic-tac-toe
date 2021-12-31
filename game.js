// AI uses Minimax with Alpha Beta Pruning
// Computer is the Maximizing / Alpha Player
let winningMove = null;
let gameOver = false;
const canvasSide = (() => {
  let minDimension = Math.min(innerHeight, innerWidth);
  return minDimension >= 450 ? 285 : minDimension * 0.9;
})();
const motherBoard = new Board();
const cellSide = canvasSide / 3;
const COMPUTER = Symbol("o");
const PLAYER = Symbol("x");

function onGameOver(message) {
  gameOver = true;
  noLoop();
  redraw();

  setTimeout(() => {
    alert(message);
    document.location.reload();
  }, 300);
}

function setup() {
  createCanvas(canvasSide, canvasSide);
  strokeWeight(2);
}

function mouseClicked() {
  // Redirection for Non-Mobile Devices
  touchStarted();
}

function touchStarted() {
  const squareRow = Math.trunc(mouseY / cellSide);
  const squareCol = Math.trunc(mouseX / cellSide);

  // Return when interaction is not allowed
  if (gameOver || !motherBoard.set(squareRow, squareCol, PLAYER)) return;

  // Check if board is saturated
  if (motherBoard.saturation === 9) onGameOver("Game Draw");

  // Move from Computer
  winningMove = compMove();
  motherBoard.set(...winningMove, COMPUTER);

  // Check if Computer has Won
  if (motherBoard.value === 1) onGameOver("Computer Wins");
}

function drawShape(shape, centerX, centerY) {
  if (shape === "x") {
    // Drawing X shape
    const shapeRadius = (cellSide * 0.6) / 2;
    line(centerX, centerY, centerX + shapeRadius, centerY - shapeRadius);
    line(centerX, centerY, centerX + shapeRadius, centerY + shapeRadius);
    line(centerX, centerY, centerX - shapeRadius, centerY - shapeRadius);
    line(centerX, centerY, centerX - shapeRadius, centerY + shapeRadius);
  } else {
    // Drawing O shape
    const shapeRadius = (cellSide * 1.2) / 2;
    circle(centerX, centerY, shapeRadius);
  }
}

function draw() {
  // UI Render
  for (let y = 0; y < canvasSide; y += cellSide) {
    for (let x = 0; x < canvasSide; x += cellSide) {
      stroke(0x00, 0x00, 0x00);

      // Drawing the grid
      line(cellSide, 0, cellSide, canvasSide);
      line(2 * cellSide, 0, 2 * cellSide, canvasSide);
      line(0, cellSide, canvasSide, cellSide);
      line(0, 2 * cellSide, canvasSide, 2 * cellSide);

      // Drawing x or o;
      const displayText = motherBoard.get(y / cellSide, x / cellSide);
      if (displayText !== undefined)
        drawShape(displayText, x + cellSide / 2, y + cellSide / 2);
    }
  }

  // Display winning move in Red
  if (motherBoard.value === 1) {
    stroke(0xff, 0x00, 0x00);

    for (const position of motherBoard.test(...winningMove, COMPUTER)) {
      const [y, x] = position;
      drawShape(
        COMPUTER.description,
        x * cellSide + cellSide / 2,
        y * cellSide + cellSide / 2
      );
    }
  }
}
