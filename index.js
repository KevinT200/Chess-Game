let selectedSquare = undefined;
let activePlayer = 'white';

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

function availableMoves(piece, square) {
    let moves = [];
    let currentSquare = square;
    let rightSide = [7, 15, 23, 31, 39, 47, 55, 63];
    if (piece[1] === 'r') {
        let leftSideReached = false;
        if (square % 8 === 0) {
            leftSideReached = true;
        }
        for (i = 0; i < 8; i++) {
            if (!leftSideReached) {
                if (currentSquare !== 0) {
                    currentSquare--;
                } else {
                    leftSideReached = true;
                    currentSquare = square;
                }
                moves.push(currentSquare)
                if (currentSquare % 8 === 0 || board[currentSquare] !== '') {
                    leftSideReached = true;
                    currentSquare = square;
                }
            } else {
                currentSquare++;
                moves.push(currentSquare);
                if (rightSide.includes(currentSquare) || board[currentSquare] !== '') {
                    break;
                }
            }
        }
        let topReached = false;
        currentSquare = square;
        for (i = 0; i < 8; i++) {
            if (!topReached) {
                currentSquare -= 8;
                if (currentSquare < 0) {
                    topReached = true;
                    currentSquare = square;
                } else {
                    moves.push(currentSquare)
                }
                if (board[currentSquare] !== '') {
                    topReached = true;
                    currentSquare = square;
                }
            } else {
                currentSquare += 8;
                if (currentSquare > 63) {
                    break;
                }
                moves.push(currentSquare);
                if (board[currentSquare] !== '') {
                    break;
                }
            }
        }
    }
    console.log(moves);
    return moves;
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
        board[selectedSquareNum] = '';
        const piece = selectedSquare.querySelector('.piece');
        squareClicked.appendChild(piece);
        selectedSquare.id = '';
        selectedSquare = undefined;
        if (activePlayer === 'white') {
            activePlayer = 'black';
            document.getElementById("turn-display").innerHTML = `${activePlayer.charAt(0).toUpperCase()
                + activePlayer.slice(1)}'s turn`;
        } else {
            activePlayer = 'white';
            document.getElementById("turn-display").innerHTML = `${activePlayer.charAt(0).toUpperCase()
                + activePlayer.slice(1)}'s turn`;
        }
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