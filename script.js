// Player factory function 
function createPlayer (name, marker) {
    return { name, marker };
};

// gameboard object
const gameboard = (function () {

    // 9 index array to represent 9 squares
    const board = ["", "", "", "", "", "", "", "", ""];

    // generate gameboard UI
    const gameboard = document.querySelector('.gameboard');

    board.forEach((item, index) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-index', `${index}`);
        gameboard.appendChild(square);
    });

    // handle square selection
    const selection = document.querySelectorAll('.square');
    selection.forEach((item) => {
        item.addEventListener('click', (e) => {
            // square is already selected
            if (e.target.textContent !== "") return;

            // record into board array
            // show selection on gameboard
            board[e.target.dataset.index] = game.currentTurn.marker;
            item.textContent = game.currentTurn.marker;

            // check for winner
            game.checkWinner();

            // a winner is decided
            if (game.winnerDeclared) {
                game.announceWinner();
            }

            // winner has not been decided
            if (!game.winnerDeclared) {
                game.announceNextPlayer();
                game.switchTurn();
                game.remainingSquares -= 1;
            }

            // game ends in a draw
            if (game.remainingSquares == 0) {
                game.declareTie();
            }
        })
    });

    // handle restart
    const restartBtn = document.querySelector('#restartBtn');
    restartBtn.addEventListener('click', () => handleRestart());
    function handleRestart () {
        // empty board array
        board.forEach((item, index) => {
            board[index] = "";
        })
        // clear gameboard
        selection.forEach((item) => {
            item.textContent = "";
        })
        // reset starting point
        game.currentTurn = game.playerOne;
        game.winnerDeclared = false;
        game.remainingSquares = 9;
        game.announcer.textContent = `Player 1's turn`;
    }

    // return object
    return { board, handleRestart };
})();

// game/display object
const game = (function () {

    // create players
    const playerOne = createPlayer('Player 1', 'X');
    const playerTwo = createPlayer('Player 2', 'O');
    
    // starting point
    let currentTurn = playerOne;
    let winnerDeclared = false;
    let remainingSquares = 9;

    // check for winner
    function checkWinner () {
        winningCondition.forEach((combination) => {
            if (gameboard.board[combination[0]] === game.currentTurn.marker &&
                gameboard.board[combination[1]] === game.currentTurn.marker &&
                gameboard.board[combination[2]] === game.currentTurn.marker
                ) {
                    game.winnerDeclared = true;
                }
        })
    };
    
    // define winning conditions
    // 8 possible combinations
    const winningCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // announce next player
    const announcer = document.querySelector('.announcer');
    function announceNextPlayer () {
        game.currentTurn === playerOne ? announcer.textContent = `Player 2's turn` : announcer.textContent = `Player 1's turn`;
    };

    // switch turn
    function switchTurn () {
        game.currentTurn === playerOne ? game.currentTurn = playerTwo : game.currentTurn = playerOne;
    };

    // announce winner
    function announceWinner () {
        announcer.textContent = `${game.currentTurn.name} won!`;
    };

    // declare tie
    function declareTie () {
        announcer.textContent = 'Tie game';
    };

    // return object
    return { 
        currentTurn,
        winnerDeclared,
        remainingSquares,
        checkWinner,
        announceNextPlayer,
        switchTurn,
        declareTie,
        announceWinner,
        playerOne,
        playerTwo,
        announcer

    };
})();
