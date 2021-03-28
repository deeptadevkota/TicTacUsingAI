function bestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                board[i][j] = ai;
                let score = minimax(board, 0, false, -Infinity, Infinity);
                board[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }
    board[move.i][move.j] = ai;
    currentPlayer = human;
}


function minimax(board, depth, isMaximizing, alpha, beta) {
    let result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let flag = 0;
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    board[i][j] = ai;
                    let score = minimax(board, depth + 1, false, alpha, beta);
                    alpha = max(alpha, score);
                    board[i][j] = '';
                    bestScore = max(score, bestScore);
                    if (beta <= alpha) {
                        flag = 1;
                        break;
                    }
                }
            }
            if (flag == 1)
                break;
        }
        return bestScore;
    } else {
        let flag = 0;
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    board[i][j] = human;
                    let score = minimax(board, depth + 1, true, alpha, beta);
                    beta = min(beta, score);
                    board[i][j] = '';
                    bestScore = min(score, bestScore);
                    if (beta <= alpha) {
                        flag = 1;
                        break;
                    }
                }
            }
            if (flag == 1)
                break;
        }
        return bestScore;
    }
}