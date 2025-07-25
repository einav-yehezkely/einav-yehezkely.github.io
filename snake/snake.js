var blockSize = 25;
var rows = 20;
var cols = 20;
var context;
var board; 

var snakeX = 1 * blockSize;
var snakeY = 1 * blockSize;
var snakeBody = [];

var velocityX = 0;
var velocityY = 0;

var foodX = 0;
var foodY = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.width = cols * blockSize;
    board.height = rows * blockSize;

    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup", changeDirection);

    setInterval(update, 100);
}

function update(){
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX == foodX && snakeY == foodY) {
        eat();
    }

    collisions();

    for(let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]
    }
    if(snakeBody.length) {
        snakeBody[0] = {x: snakeX, y: snakeY};
    }

    context.fillStyle = "green";
    snakeX += velocityX;
    snakeY += velocityY;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i].x, snakeBody[i].y, blockSize, blockSize);
    }
    
    gameOver();
}

function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(event) {
    if(event.code == 'ArrowUp' && velocityY != 1 * blockSize) {
        velocityX = 0;
        velocityY = -1 * blockSize;
    }
    else if(event.code == 'ArrowDown' && velocityY != -1 * blockSize) {
        velocityX = 0;
        velocityY = 1 * blockSize;
    }
    else if(event.code == 'ArrowLeft' && velocityX != 1 * blockSize) {
        velocityX = -1 * blockSize;
        velocityY = 0;
    }
    else if(event.code == 'ArrowRight' && velocityX != -1 * blockSize) {
        velocityX = 1 * blockSize;
        velocityY = 0;
    }
}

function eat(){
    snakeBody.push({x: foodX, y: foodY});
    placeFood();
}

function collisions() {
    if(snakeX < 0){
            snakeX = (cols - 1) * blockSize;
    }
    if(snakeX >= cols * blockSize) {
        snakeX = 0;
    }
    if(snakeY < 0) {
        snakeY = (rows - 1) * blockSize;
    }
    if(snakeY >= rows * blockSize) {
        snakeY = 0;
    }
}


function gameOver() {
    for(let i = 0; i < snakeBody.length; i++) {
        if(snakeX == snakeBody[i].x && snakeY == snakeBody[i].y) {
            alert("Game Over!");
            resetGame();
        }
    }
    
}

function resetGame() {
    snakeX = 1 * blockSize;
    snakeY = 1 * blockSize;
    snakeBody = [];
    velocityX = 0;
    velocityY = 0;
    placeFood();
}