let selectedSquare = undefined;
let activePlayer = 'white';

let startingBoard = 
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

function availableMoves(typeOfpiece, square) {
    let moves = [];
    let leftSideReached = false;
    let currentSquare = square;
    if (typeOfpiece === 'r') {
        for (i = 0; i < 8; i++) {
            if (!leftSideReached) {
                currentSquare++;
                moves.push(currentSquare);
            } else {
                currentSquare = currentSquare++;
                moves.push(currentSquare);
            }
            if (currentSquare % 8 === 0) {
                leftSideReached = true;
                currentSquare = square;
            }
        }
    }
    return moves;
}

function squareClicked(squareClicked, square) {
    if (selectedSquare === undefined && squareClicked.id !== '' && activePlayer[0] === squareClicked.id[0]) {
        selectedSquare = squareClicked;
        selectedSquare.classList.add('selected');
    } else if (squareClicked.id[0] !== activePlayer[0] && selectedSquare !== undefined) {
        if (squareClicked.querySelector('img') !== null) {
            squareClicked.querySelector('img').remove();
        }
        
        selectedSquare.classList.remove('selected');
        squareClicked.id = selectedSquare.id;
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
    console.log(`Square ${selectedSquare} was clicked!`);
}

let grid = document.querySelector('.chessboard');

let squareColor = 'white';
for(let i = 0; i < 64; i++){
    const square = document.createElement('div');
    square.classList.add('square');
    square.classList.add(squareColor);
    square.id = startingBoard[i];
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
    if (startingBoard[i] !== ''){
        const piece = document.createElement('img');
        piece.classList.add('piece');
        piece.src = `./images/${startingBoard[i]}.png`;
        square.appendChild(piece);
    }
    square.addEventListener('click', function(){squareClicked(square), i});
    grid.appendChild(square);
}