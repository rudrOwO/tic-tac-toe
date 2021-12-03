function compMove() {
    let alpha = -1;
    let beta = 1;
    let bestMove = {value: -1, pos: []};
    
    const miniMax = function(board, turn) {
        if (board.saturation === 9 || board.value !== 0)  // Depth Termination
            return board.value;
        
        if (turn === COMPUTER) {  // This is the Maximizing Player
            let bestMove = -1;

            for (let i = 0, breakNest = false; i < 3 && !breakNest; ++i) for (let j = 0; j < 3 && !breakNest; ++j) if (board.get(i, j) === undefined) {
                let newBoard = new Board(board);
                newBoard.set(i, j, COMPUTER);
                bestMove = Math.max(bestMove, miniMax(newBoard, PLAYER));
                // alpha = Math.max(bestMove, alpha);
                
                // if (alpha > beta)
                //     breakNest = true;
            }
            
            return bestMove;

        } else {  // This is the Minimizing Player
            let bestMove = 1;

            for (let i = 0, breakNest = false; i < 3 && !breakNest; ++i) for (let j = 0; j < 3 && !breakNest; ++j) if (board.get(i, j) === undefined) {
                let newBoard = new Board(board);
                newBoard.set(i, j, PLAYER);
                bestMove = Math.min(bestMove, miniMax(newBoard, COMPUTER));
                // beta = Math.min(bestMove, beta);
                
                // if (alpha > beta)
                //     breakNest = true;
            }

            return bestMove;
        }
    }

    for (let i = 0, breakNest = false; i < 3 && !breakNest; ++i) for (let j = 0; j < 3 && !breakNest; ++j) if (mainBoard.get(i, j) === undefined) {
        let newBoard = new Board(mainBoard);
        newBoard.set(i, j, COMPUTER);
        let latestMove = miniMax(newBoard, PLAYER);
        
        if (latestMove > bestMove.value) {
            bestMove.value = latestMove;
            bestMove.pos = [i, j];
        }
        
        // if (alpha > beta)
        //     breakNest = true;
    }
    
    return bestMove.pos;
}