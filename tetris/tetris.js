var cols = 10;
var rows = 20;
var blockSize = 30;
var board;
var context;

const SHAPES = {
    I: [[0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]],
    O: [[1,1],
        [1,1]],
    T: [[0,1,0],
        [1,1,1],
        [0,0,0]],
}

let currentShape = {
    shape: SHAPES.I,
    x: 3,
    y: 0
}

function createBoard() {
    board = [];
    for (let r = 0; r < rows; r++) {
        board[r] = Array(cols).fill(0);
    }
}

window.onload = function() {
    board = document.getElementById("board");
    board.width = cols * blockSize;
    board.height = rows * blockSize;

    context = board.getContext("2d");
    createBoard();

    setInterval(MoveShape, 500);
}

function drawBoard() {
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols; c++) {
            context.fillStyle = "black";
            context.fillRect(c * blockSize, r * blockSize, blockSize, blockSize);
        }
    }

    let shape = currentShape.shape;
    for(let r = 0; r < shape.length; r++) {
        for(let c = 0; c < shape[r].length; c++) {
            if(shape[r][c] !== 0) {
                context.fillStyle = "green";
                context.fillRect((currentShape.x + c) * blockSize, (currentShape.y + r) * blockSize, blockSize, blockSize);
            }
        }
    }
}

function MoveShape() {
    if(!reachedBottom()) {
        currentShape.y += 1;
    }   
    drawBoard();
}

function reachedBottom() {
    let shape = currentShape.shape;
    for(let r = 0; r < shape.length; r++) {
        for(let c = 0; c < shape[r].length; c++) {
            if(shape[r][c] !== 0) {
                if(currentShape.y + r >= rows - 1) {
                    return true;
                }
            }
        }
    }
    return false;
}