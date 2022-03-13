const CELL_SIZE = 20;
const CANVAS_SIZE = 600;
//made faster
const REDRAW_INTERVAL = 30;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;

//this
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
const MOVE_INTERVAL = 200;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
<<<<<<< HEAD
    let body = [];

    for(var i=0; i<3; i++) {
    body.push({x: head.x+i, y: head.y+i});
    
    }
=======
    let body = [{ x: head.x, y: head.y }];
>>>>>>> 5292de35abe3db9e260ac449ea27d3579538bd00
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

<<<<<<< HEAD
function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score:snake.score,
        lives:snake.lives-1,
    }
}

let snake = {
    color: "red",
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
    lives: 3,
}

=======
>>>>>>> 5292de35abe3db9e260ac449ea27d3579538bd00
function newSnake(color) {
    return {
        color: "purple",
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
        lives: 3,
    }
}

<<<<<<< HEAD
let snake1 = newSnake("green");
=======
let snake1 = newSnake("purple");
>>>>>>> 5292de35abe3db9e260ac449ea27d3579538bd00

let apples = [
    {
        color: "red",
        position: initPosition(),
    },
    {
        color: "green",
        position: initPosition(),
    }
]

let lives = {
    color: "red",
    position: {
        x: 0,
        y: 0,
    }
}

let hearts = []

function addHeart(snake) {
    if (isPrime(snake.score)) {
        let heart = {
            color: "red",
            position: initPosition()
        }
        hearts.push(heart);
    }
}

function drawHearts(ctx) {
    for (i = 0; i < hearts.length; i++) {
        let heart = hearts[i];
        let imgLivesFood = document.getElementById("lives")
        ctx.drawImage(imgLivesFood, heart.position.x * CELL_SIZE, heart.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
}

function isPrime(num) {
    if (num < 2) {
        return false;
    }
    for (var i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    
    console.log(x, y);
}


function downHead(ctx, x,y) {
    var imgHead = document.getElementById("head");
    ctx.drawImage(imgHead , x * CELL_SIZE - 15, y * CELL_SIZE - 15, CELL_SIZE+30, CELL_SIZE+30);
}

function rightHead(ctx,x,y){
    var rHead = document.getElementById("rightHead");
    ctx.drawImage(rHead , x * CELL_SIZE - 15, y * CELL_SIZE - 15, CELL_SIZE+30, CELL_SIZE+30);
}

function leftHead(ctx,x,y){
    var lHead = document.getElementById("leftHead");
    ctx.drawImage(lHead , x * CELL_SIZE - 15, y * CELL_SIZE - 15, CELL_SIZE+30, CELL_SIZE+30);
}

<<<<<<< HEAD
function upHead(ctx,x,y){

    var uHead = document.getElementById("upHead");
    ctx.drawImage(uHead , x * CELL_SIZE - 15, y * CELL_SIZE - 15, CELL_SIZE+30, CELL_SIZE+30);
}


function drawLives(ctx, snake){
=======
function drawLives(ctx, snake) {
>>>>>>> 5292de35abe3db9e260ac449ea27d3579538bd00
    var imgLives = document.getElementById("lives");
    for (let index = 0; index < snake.lives; index++) {
        ctx.drawImage(imgLives, (lives.position.x + index) * CELL_SIZE, lives.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
}

function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function drawApples(ctx) {
    for (let i = 0; i < apples.length; i++) {
        let apple = apples[i];

        var img = document.getElementById("apple");
        ctx.drawImage(img, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
}

function drawSnake(ctx, snake) {
    // drawHead(ctx, snake.head.x, snake.head.y);
    // drawCell(ctx, snake.head.x, snake.head.y, snake.color);
    if(snake.direction == DIRECTION.DOWN) {
        downHead(ctx, snake.head.x, snake.head.y);
    }
    else if(snake.direction == DIRECTION.RIGHT) {
        rightHead(ctx, snake.head.x, snake.head.y);
    }
    else if(snake.direction == DIRECTION.UP) {
        upHead(ctx, snake.head.x, snake.head.y);
    }
    else if(snake.direction == DIRECTION.LEFT) {
        leftHead(ctx, snake.head.x, snake.head.y);
    }

    for (let i = 1; i < snake.body.length; i++) {
        // drawHead(ctx, snake.body[i].x, snake.body[i].y);
        drawCell(ctx, snake.body[i].x, snake.body[i].y, snake.color);

    }
}

function draw() {
    setInterval(function () {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        drawLives(ctx, snake1);
        drawSnake(ctx, snake1);
        drawApples(ctx);
        drawHearts(ctx);
        drawScore(snake1);

    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

function eat(snake) {
    var audio = new Audio('assets/eat.mp3');
    for (let i = 0; i < apples.length; i++) {
        let apple = apples[i];
        if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
            apple.position = initPosition();
            audio.play();
            snake.score++;
            snake.body.push({ x: snake.head.x, y: snake.head.y });
            addHeart(snake);
        }
    }
    for (let i = 0; i < hearts.length; i++) {
        let heart = hearts[i];
        if (snake.head.x == heart.position.x && snake.head.y == heart.position.y) {
            audio.play();
            snake.score++;
            snake.lives++;
            snake.body.push({ x: snake.head.x, y: snake.head.y });
            hearts.splice(i, 1);
            addHeart(snake);
        }
    }

}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apples);
    
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apples);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apples);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apples);
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
<<<<<<< HEAD
    if (!checkCollision([snake1])) {
        setTimeout(function() {
=======

    if (!checkCollision(snake1)) {
        setTimeout(function () {
>>>>>>> 5292de35abe3db9e260ac449ea27d3579538bd00
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        initGame();
    }
}
function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function checkCollision(snake) {
    let isCollide = false;
    //this
<<<<<<< HEAD
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                }
=======
    for (let i = 1; i < snake.body.length; i++) {
        if (snake.head.x == snake.body[i].x && snake.head.y == snake.body[i].y) {
            snake.lives--;
            snake.body = [{ x: snake.head.x, y: snake.head.y }]
            if(snake.lives==0){
                isCollide = true;
>>>>>>> 5292de35abe3db9e260ac449ea27d3579538bd00
            }
        }
    }

    if (isCollide) {
        // Soal no 5: Add game over audio:
        var audio = new Audio('assets/game-over.mp3');
        audio.play();
        alert("Game over");
<<<<<<< HEAD
        snake1 = initSnake("red");
        
=======
        hearts = []
        snake1 = newSnake("purple");
>>>>>>> 5292de35abe3db9e260ac449ea27d3579538bd00
    }

    return isCollide;
}


document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        if (snake1.direction != DIRECTION.RIGHT) {
            snake1.direction = DIRECTION.LEFT;
        }
        // snake1.direction = DIRECTION.LEF;
    } else if (event.key === "ArrowRight") {
        if (snake1.direction != DIRECTION.LEFT) {
        snake1.direction = DIRECTION.RIGHT;}
    } else if (event.key === "ArrowUp") {
        if (snake1.direction != DIRECTION.DOWN) {
        snake1.direction = DIRECTION.UP;}
    } else if (event.key === "ArrowDown") {
        if (snake1.direction != DIRECTION.UP) {
        snake1.direction = DIRECTION.DOWN;}
    }
})

<<<<<<< HEAD
// move(snake1);
=======
>>>>>>> 5292de35abe3db9e260ac449ea27d3579538bd00
function initGame() {
    move(snake1);
}

initGame();
