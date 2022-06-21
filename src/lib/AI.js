function compMove() {
  // Decorator for miniMax function
  const miniMax = function (board, alpha, beta, turn) {
    // Minimax function
    if (board.saturation === 9 || board.value !== 0)
      // Static Evaluation
      return board.value;

    if (turn === COMPUTER) {
      // This is the Maximizing Player
      let bestMove = -1;

      for (let i = 0, breakNest = false; i < 3 && !breakNest; ++i)
        for (let j = 0; j < 3 && !breakNest; ++j)
          if (board.get(i, j) === undefined) {
            let newBoard = new Board(board);
            newBoard.set(i, j, COMPUTER);
            bestMove = Math.max(
              bestMove,
              miniMax(newBoard, alpha, beta, PLAYER)
            );
            alpha = Math.max(bestMove, alpha);

            if (alpha > beta) breakNest = true;
          }

      return bestMove;
    } else {
      // This is the Minimizing Player
      let bestMove = 1;

      for (let i = 0, breakNest = false; i < 3 && !breakNest; ++i)
        for (let j = 0; j < 3 && !breakNest; ++j)
          if (board.get(i, j) === undefined) {
            let newBoard = new Board(board);
            newBoard.set(i, j, PLAYER);
            bestMove = Math.min(
              bestMove,
              miniMax(newBoard, alpha, beta, COMPUTER)
            );
            beta = Math.min(bestMove, beta);

            if (alpha > beta) breakNest = true;
          }

      return bestMove;
    }
  };

  // Wrapper Code
  let bestMove = { value: -1, pos: [] };

  for (let i = 0, breakNest = false; i < 3 && !breakNest; ++i)
    for (let j = 0; j < 3 && !breakNest; ++j)
      if (motherBoard.get(i, j) === undefined) {
        let newBoard = new Board(motherBoard);
        newBoard.set(i, j, COMPUTER);
        let latestMove = miniMax(newBoard, -1, 1, PLAYER);

        if (latestMove > bestMove.value) {
          bestMove.value = latestMove;
          bestMove.pos = [i, j];
        }

        if (bestMove.value === 1) breakNest = true;
      }

  return bestMove.pos;
}
