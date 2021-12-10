// AI uses Minimax with Alpha Beta Pruning
// Computer is the Maximizing / Alpha Player
let winningMove = null;
const motherBoard = new Board();
const isMobile = navigator.userAgentData.mobile;
const sideLength = isMobile ? Math.min(innerHeight, innerWidth) : 240;
const squareSide = sideLength / 3;
const COMPUTER = Symbol('o');
const PLAYER = Symbol('x');


function gameOver(message) {
    noLoop();
    redraw();

    setTimeout(() => {
        alert(message);
        document.location.reload();
    }, 1000 / frameRate());
}


function setup() {
    createCanvas(sideLength, sideLength);
    textSize(squareSide);
    textAlign(CENTER, CENTER);
    strokeWeight(2);
}


function touchStarted() {
    const squareRow = Math.trunc(mouseY / squareSide);
    const squareCol = Math.trunc(mouseX / squareSide);
    
    // Check Click/Touch bounds
    if (!motherBoard.set(squareRow, squareCol, PLAYER))
        return;
    
    // Check if board is saturated
    if (motherBoard.saturation === 9)
        gameOver('Game Draw');
    
    // Move from Computer
    winningMove = compMove();
    motherBoard.set(...winningMove, COMPUTER);
    
    // Check if Computer has Won
    if (motherBoard.value === 1)
        gameOver('Computer Wins');
}


function draw() {  
    // UI Render
    for (let y = 0; y < sideLength; y += squareSide) {
        for (let x = 0; x < sideLength; x += squareSide) {
            fill(0xff);
            square(x, y, squareSide);
            fill(0x00);
            const displayText = motherBoard.get(y / squareSide, x / squareSide);
            if (displayText !== undefined)
                text(displayText, x + squareSide / 2, y + squareSide / 2);
        }
    }
    
    // Display winning move in Red
    if (motherBoard.value === 1) {
        fill(0xff, 0x00, 0x00);
        
        for (const position of motherBoard.test(...winningMove, COMPUTER)) {
            const [y, x] = position;
            text(COMPUTER.description, x * squareSide + squareSide / 2, y * squareSide + squareSide / 2);
        }
    }
}