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

var randomMode = false;
var reverseMode = false;

window.onload = function() {
    board = document.getElementById("board");
    board.width = cols * blockSize;
    board.height = rows * blockSize;

    document.getElementById("randomMode").addEventListener("click", function() {
        randomMode = !randomMode;
        console.log("Random Mode: " + randomMode);
        if(randomMode == true){
            this.classList.toggle("active");
        }
        else{
            this.classList.remove("active");
        }
        
    });
    document.getElementById("reverseMode").addEventListener("click", function() {
        reverseMode = !reverseMode;
        console.log("Reverse Mode: " + reverseMode);
        if(reverseMode == true){
            this.classList.toggle("active");
        }
        else{
            this.classList.remove("active");
        }
    });


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

    context.fillStyle = "#00ffcc";
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
        velocityY = reverseMode ? 1 * blockSize : -1 * blockSize;
    }
    else if(event.code == 'ArrowDown' && velocityY != -1 * blockSize) {
        velocityX = 0;
        velocityY = reverseMode ? -1 * blockSize : 1 * blockSize;
    }
    else if(event.code == 'ArrowLeft' && velocityX != 1 * blockSize) {
        velocityX = reverseMode ? 1 * blockSize : -1 * blockSize;
        velocityY = 0;
    }
    else if(event.code == 'ArrowRight' && velocityX != -1 * blockSize) {
        velocityX = reverseMode ? -1 * blockSize : 1 * blockSize;
        velocityY = 0;
    }
}

function eat(){
    snakeBody.push({x: foodX, y: foodY});
    placeFood();
}

function collisions() {
    if(randomMode) {
        if(snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
            const walls = ["top", "bottom", "left", "right"];
            const newWall = walls[Math.floor(Math.random() * 4)];

            switch (newWall) {
                case "top":
                    snakeX = Math.floor(Math.random() * cols) * blockSize;
                    snakeY = 0;
                    break;
                case "bottom":
                    snakeX = Math.floor(Math.random() * cols) * blockSize;
                    snakeY = (rows - 1) * blockSize;
                    break;
                case "left":
                    snakeX = 0;
                    snakeY = Math.floor(Math.random() * rows) * blockSize;
                    break;
                case "right":
                    snakeX = (cols - 1) * blockSize;
                    snakeY = Math.floor(Math.random() * rows) * blockSize;
                    break;
            }
        }
        
    }
    else{
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