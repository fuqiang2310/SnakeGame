const gameSnake = [
    [3,2],
    [3,3],
    [3,4]
];

const gameBoard = [
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['#','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['#','.','.','.','.','.','.','.']
];

const print = function(snake, board) {
    const dir = getSnakeDir(snake);

    for (let i = 0; i < board.length; i++) {
        let row = '';
        for (let j = 0; j < board[i].length; j++) {
            if (isSnakeHead(snake, i, j)) {
                row += dir[0];
            } else if (isSnake(snake, i, j)) {
                row += '*';
            } else {
                row += board[i][j];
            }
        }
        console.log(row);
    }
}

const isSnake = function(snake, row, col) {
    for (let i = 0; i < snake.length; i++) {
        if (snake[i][0] == row && snake[i][1] == col) {
            return true;
        }
    }

    return false;
}

const isSnakeHead = function(snake, row, col) {
    return snake[0][0] == row && snake[0][1] == col;
}

const getSnakeDir = function(snake) {
    if (snake[0][0] == snake[1][0]) {
        if (snake[0][1] > snake[1][1]) {
            return ['>', 1];
        } else {
            return ['<', 3];
        }

    } else if (snake[0][1] == snake[1][1]) {
        if (snake[0][0] > snake[1][0]) {
            return ['v', 2];
        } else {
            return ['^', 0];
        }
    }
}

const moveSnake = function(snake, board, steps) {
    const dirs = [
        [-1, 0], // up
        [0, 1],  // right
        [1, 0],  // down
        [0, -1]  // left
    ];

    let [curDir, curDirIdx] = getSnakeDir(snake); 

    while (steps > 0) {
        let nextMove = [
            snake[0][0] + dirs[curDirIdx%4][0],
            snake[0][1] + dirs[curDirIdx%4][1]
        ];

        if (!isValidMove(board, snake, nextMove)) {
            // change dir clockwise if the next move is invalid
            curDirIdx++;
            if (curDirIdx > 6) {
                // after a valid move curDirIdx will be between 0~3
                // therefore once it reaches 7 we know we have tried all directions
                console.log('Dead snake');
                return;
            }
            continue;
        }

        snake.unshift(nextMove);
        snake.pop();
        print(snake, board);
        console.log('');

        curDirIdx = curDirIdx%4; // reset curDirIdx to make sure it's always between 0~3 after a valid move
        steps--;
    }
}

// a move is valid if it's inbound of the board and not hitting any obstacle or body of the snake
const isValidMove = function(board, snake, move) {
    return move[0] >= 0 && move[0] < board.length && move[1] >= 0 && move[1] < board[0].length 
        && (move[0] != snake[1][0] || move[1] != snake[1][1]) && board[move[0]][move[1]] != '#';
}

//print(gameSnake, gameBoard);
moveSnake(gameSnake, gameBoard, 4);