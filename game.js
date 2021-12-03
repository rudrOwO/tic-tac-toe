// AI uses Minimax with Alpha Beta Pruning
// Computer is the Maximizing / Alpha Player
const mainBoard = new Board();
const canvasWidth = 240;
const canvasHeight = 240;
const squareSide = canvasWidth / 3;
const COMPUTER = Symbol('o');
const PLAYER = Symbol('x');


function gameOver(message) {
    noLoop();
    redraw();
    setTimeout(() => alert(message), 1000 / frameRate());
}


function setup() {
    createCanvas(canvasWidth, canvasHeight);
    textSize(squareSide);
    textAlign(CENTER, CENTER);
}


function touchStarted() {
    let squareRow = Math.trunc(mouseY / squareSide);
    let squareCol = Math.trunc(mouseX / squareSide);
    
    // Check Click/Touch bounds
    if (squareRow >= 0 && squareRow < 3 && squareCol >= 0 && squareCol < 3)
        mainBoard.set(squareRow, squareCol, PLAYER);
    else
        return;
    
    // Check if board is saturated
    if (mainBoard.saturation === 9) {
        gameOver('Game Draw');
        return;
    }
    
    // Move from Computer
    mainBoard.set(...compMove(), COMPUTER);
    
    // Check if Computer has Won
    if (mainBoard.value === 1) {
        gameOver('Computer Wins');
        return;
    }
}


function draw() {  // UI Render
    for (let y = 0; y < canvasHeight; y += squareSide) {
        for (let x = 0; x < canvasWidth; x += squareSide) {
            square(x, y, squareSide);
            let displayText = mainBoard.get(y / squareSide, x / squareSide);
            if (displayText !== undefined)
                text(displayText, x + squareSide / 2, y + squareSide / 2);
        }
    }
}