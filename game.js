const mainBoard = new Board();
const canvasWidth = 240;
const canvasHeight = 240;
const squareSide = canvasWidth / 3;
const computer = Symbol('o');
const player = Symbol('x');


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
        mainBoard.set(squareRow, squareCol, player);
    
    // Check if board is saturated
    if (mainBoard.saturation == 9) {
        noLoop();
        setTimeout(() => alert('Game Draw'), 20);
    }
    
    // miniMax 
    
    // Check if Computer has Won
    if (mainBoard.value === 1) {
        noLoop();
        setTimeout(() => alert('Computer Wins'), 20);
    }
}


function draw() {
    // UI Render
    for (let y = 0; y < canvasHeight; y += squareSide) {
        for (let x = 0; x < canvasWidth; x += squareSide) {
            square(x, y, squareSide);
            let displayText = mainBoard.get(y / squareSide, x / squareSide);
            if (displayText !== null)
                text(displayText, x + squareSide / 2, y + squareSide / 2);
        }
    }
}