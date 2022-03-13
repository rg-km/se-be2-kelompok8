const CELL_SIZE = 20;
const CANVAS_SIZE = 600;
//made faster
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
//this
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
let MOVE_INTERVAL = 120;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{ x: head.x, y: head.y }];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function newSnake(color) {
    return {
        color: "purple",
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
        lives: 3,
        level: 1,
    }
}

let snake1 = newSnake("purple");

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
}

function drawLives(ctx, snake) {
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
    drawCell(ctx, snake.head.x, snake.head.y, snake.color);
    for (let i = 1; i < snake.body.length; i++) {
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

function newLevel(snake) {
    if(snake.score%5 ==0){
        alert("Level " +snake.level+ " Complete!")
        snake.level++
        MOVE_INTERVAL -= 20;
        document.getElementById("level").innerHTML = "Level: " +snake.level+  " <br>Speed:" +MOVE_INTERVAL+ " ms";
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
            newLevel(snake);
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
            newLevel(snake);
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

    if (!checkCollision(snake1)) {
        setTimeout(function () {
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
    for (let i = 1; i < snake.body.length; i++) {
        if (snake.head.x == snake.body[i].x && snake.head.y == snake.body[i].y) {
            snake.lives--;
            snake.body = [{ x: snake.head.x, y: snake.head.y }]
            if(snake.lives==0){
                isCollide = true;
            }
        }
    }

    if (isCollide) {
        // Soal no 5: Add game over audio:
        var audio = new Audio('assets/game-over.mp3');
        audio.play();
        alert("Game over");
        hearts = []
        snake1 = newSnake("purple");
    }

    return isCollide;
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        snake1.direction = DIRECTION.LEFT;
    } else if (event.key === "ArrowRight") {
        snake1.direction = DIRECTION.RIGHT;
    } else if (event.key === "ArrowUp") {
        snake1.direction = DIRECTION.UP;
    } else if (event.key === "ArrowDown") {
        snake1.direction = DIRECTION.DOWN;
    }
})

function initGame() {
    move(snake1);
}

initGame();
