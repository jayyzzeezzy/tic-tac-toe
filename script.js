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

    // return object
    return { board };
})();

// game object
const game = (function () {

    // create players
    const playerOne = createPlayer('Player 1', 'x');
    console.log(playerOne);
    const playerTwo = createPlayer('Player 2', 'o');
    
    // starting point
    let currentTurn = playerOne;
    let winnerDeclared = false;
    let remainingSquares = 9;

    // check for winner
    function checkWinner () {
        winningCondition.forEach((combination) => {
            if (gameboard.board[combination[0]] === currentTurn.marker &&
                gameboard.board[combination[1]] === currentTurn.marker &&
                gameboard.board[combination[2]] === currentTurn.marker
                ) {
                    console.log(`Winner is ${currentTurn.name}!`);
                    winnerDeclared = true;
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

    // return object
    return { 
        currentTurn,
        winnerDeclared,
        remainingSquares,
        checkWinner,

    };
})();

gameboard.board[0] = 'x';
gameboard.board[1] = 'x';
gameboard.board[2] = 'x';
console.log(gameboard.board);

game.checkWinner();