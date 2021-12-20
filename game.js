// AI uses Minimax with Alpha Beta Pruning
// Computer is the Maximizing / Alpha Player
let winningMove = null;
const motherBoard = new Board();
const isMobile = navigator.userAgentData.mobile;
const sideLength = isMobile ? Math.min(innerHeight, innerWidth) : 270;
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
    const defaultCanvas = createCanvas(sideLength, sideLength);

    // Canvas Styling
    defaultCanvas.style('padding',  '0');
    defaultCanvas.style('display',  'block');
    defaultCanvas.style('margin',   'auto');
    defaultCanvas.style('position', 'absolute');
    defaultCanvas.style('inset',    '0');

    // Text and Stroke Styling
    textSize(squareSide * 0.9);
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
            // Drawing vertical lines
            fill(0xff);
            line(squareSide, 0, squareSide, sideLength);
            line(2 * squareSide, 0, 2 * squareSide, sideLength);
            line(0, squareSide, sideLength, squareSide);
            line(0, 2 * squareSide, sideLength, 2 * squareSide);
            fill(0x00);

            // Drawing x or o;
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