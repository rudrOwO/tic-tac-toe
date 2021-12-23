// AI uses Minimax with Alpha Beta Pruning
// Computer is the Maximizing / Alpha Player
let winningMove = null;
const motherBoard = new Board();
const isMobile = navigator.userAgentData.mobile;
const canvasSide = isMobile ? Math.min(innerHeight, innerWidth) * 0.9 : 270;
const cellSide = canvasSide / 3;
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
    const defaultCanvas = createCanvas(canvasSide, canvasSide);

    // Styling
    defaultCanvas.style('padding',  '0');
    defaultCanvas.style('display',  'block');
    defaultCanvas.style('margin',   'auto');
    defaultCanvas.style('position', 'absolute');
    defaultCanvas.style('inset',    '0');
    strokeWeight(2);
}


function touchStarted() {
    const squareRow = Math.trunc(mouseY / cellSide);
    const squareCol = Math.trunc(mouseX / cellSide);
    
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


function drawShape(shape, centerX, centerY) {
    if (shape === 'x') {  // Drawing X shape
        const shapeRadius = (cellSide * 0.6) / 2;         
        line(centerX, centerY, centerX + shapeRadius, centerY - shapeRadius);
        line(centerX, centerY, centerX + shapeRadius, centerY + shapeRadius);
        line(centerX, centerY, centerX - shapeRadius, centerY - shapeRadius);
        line(centerX, centerY, centerX - shapeRadius, centerY + shapeRadius);
    
    } else { // Drawing O shape
        const shapeRadius = (cellSide * 1.2) / 2;         
        ellipse(centerX, centerY, shapeRadius, shapeRadius);
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
            drawShape(COMPUTER.description, x * cellSide + cellSide / 2, y * cellSide + cellSide / 2);
        }
    }
}