let mainBoard = new Board();
const canvasWidth = 240;
const canvasHeight = 240;
const squareSide = canvasWidth / 3;
const compChar = 'x';
const computer = Symbol('computer');
const playerChar = 'o';
const player = Symbol('player');


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
        mainBoard.data[squareRow][squareCol] = playerChar;
}


function draw() {
    // UI Render
    for (let y = 0; y < canvasHeight; y += squareSide) {
        for (let x = 0; x < canvasWidth; x += squareSide) {
            square(x, y, squareSide);
            let displayText = mainBoard.data[y / squareSide][x / squareSide];
            if (displayText !== null)
                text(displayText, x + squareSide / 2, y + squareSide / 2);
        }
    }
}