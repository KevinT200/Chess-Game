let selectedSquare = undefined;
let activePlayer = 'white';

/* TODO:
    King Moves
    Knight Moves
    En Passant
    Checkmate
    Draws (stalemate, 50 move rule, repeat postitions)
*/

let board = 
[
    'br', 'bkn', 'bb', 'bq', 'bk', 'bb', 'bkn', 'br',
    'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp',
    'wr', 'wkn', 'wb', 'wq', 'wk', 'wb', 'wkn', 'wr'
];

function calculateLine(increment, square, direction) {
    let moves = [];
    if (square % 8 === 0) {
        return moves;
    }
    for (i = 1; i < 9; i++) {
        currentSquare = square + (i * increment);
        if ((direction === 'vertical' || direction === 'horizontal') && (currentSquare > 63 || currentSquare < 0)) {
            break;
        }
        moves.push(currentSquare);
        if ((direction === 'horizontal' && (currentSquare % 8 === 0 || (currentSquare + 1) % 8 === 0)) || board[currentSquare] !== '') {
            break;
        }
    }
    return moves;
}

function availableMoves(piece, square) {
    switch(piece[1]) {
        case 'r':
            return calculateRookMoves(square);
        case 'p':
            return calculatePawnMoves(piece, square);
        case 'b':
            return calculateBishopMoves(square);
        case 'q':
            return calculateQueenMoves(square);
    }
    return [];
}

function calculateRookMoves(square) {
    return [...calculateLine(1, square, 'horizontal'), ...calculateLine(8, square, 'vertical'), ...calculateLine(-1, square, 'horizontal'), ...calculateLine(-8, square, 'vertical')];
}

function calculateBishopMoves(square) {
    return [...calculateLine(7, square, 'diagonal'), ...calculateLine(9, square, 'diagonal'), ...calculateLine(-7, square, 'diagonal'), ...calculateLine(-9, square, 'diagonal')];
}

function calculatePawnMoves(piece, square) {
    let moves = [];
    if (piece[0] === 'w') {
        if (piece[2] != 'm' && (board[square - 16] === '' && board[square - 8] === '')) {
            moves.push(square - 16);
        }
        if (board[square - 8] === '') {
            moves.push(square - 8);
        }
        if (board[square - 7] != '') {
            moves.push(square - 7);
        }
        if (board[square - 9] != '') {
            moves.push(square - 9);
        }
    } else {
        if (piece[2] != 'm' && (board[square + 16] === '' && board[square + 8] === '')) {
            moves.push(square + 16);
        }
        if (board[square + 8] === '') {
            moves.push(square + 8);
        }
        if (board[square + 7] != '') {
            moves.push(square + 7);
        }
        if (board[square + 9] != '') {
            moves.push(square + 9);
        }
    }
    return moves;
}

function calculateQueenMoves(square) {
    return [...calculateRookMoves(square), ...calculateBishopMoves(square)];
}

function calculateKnightMoves(square) {

}

function changeDisplay(activePlayer) {
    if (activePlayer === 'white') {
        activePlayer = 'black';
        document.getElementById("turn-display").innerHTML = `${activePlayer.charAt(0).toUpperCase()
            + activePlayer.slice(1)}'s Turn`;
        return 'black';
    } else {
        activePlayer = 'white';
        document.getElementById("turn-display").innerHTML = `${activePlayer.charAt(0).toUpperCase()
            + activePlayer.slice(1)}'s Turn`;
        return 'white';
    }
}

let selectedSquareNum;
function squareClicked(squareClicked, square) {
    if (selectedSquare === undefined && squareClicked.id !== '' && activePlayer[0] === squareClicked.id[0]) {
        selectedSquareNum = square;
        selectedSquare = squareClicked;
        selectedSquare.classList.add('selected');
    } else if (squareClicked.id[0] !== activePlayer[0] && selectedSquare !== undefined && availableMoves(selectedSquare.id, selectedSquareNum).includes(square)) {
        if (squareClicked.querySelector('img') !== null) {
            squareClicked.querySelector('img').remove();
        }
        selectedSquare.classList.remove('selected');
        squareClicked.id = selectedSquare.id;
        board[square] = squareClicked.id;
        if (board[square][1] === 'p' && board[square][2] != 'm') {
            board[square] += 'm';
            squareClicked.id += 'm';
        }
        board[selectedSquareNum] = '';
        const piece = selectedSquare.querySelector('.piece');
        squareClicked.appendChild(piece);
        selectedSquare.id = '';
        selectedSquare = undefined;
        activePlayer = changeDisplay(activePlayer);
    } else if (selectedSquare === squareClicked) {
        selectedSquare.classList.remove('selected');
        selectedSquare = undefined;
    }
    console.log(`Square ${square} was clicked!`);
}

let grid = document.querySelector('.chessboard');

let squareColor = 'white';
for(let i = 0; i < 64; i++){
    const square = document.createElement('div');
    square.classList.add('square');
    square.classList.add(squareColor);
    square.id = board[i];
    if((i + 1) % 8 !== 0) {
        if (squareColor === 'white') {
            squareColor = 'black';
        } else {
            squareColor = 'white';
        }
    }
    if(i === 0){
        square.classList.add('top-left');
    } else if(i === 7) {
        square.classList.add('top-right');
    } else if(i === 56) {
        square.classList.add('bottom-left');
    } else if(i === 63) {
        square.classList.add('bottom-right');
    }
    if (board[i] !== ''){
        const piece = document.createElement('img');
        piece.classList.add('piece');
        piece.src = `./images/${board[i]}.png`;
        square.appendChild(piece);
    }
    square.addEventListener('click', function(){squareClicked(square, i)});
    grid.appendChild(square);
}