let KEY_DOWN = 40;
let KEY_UP = 38;
let PADDLE_SHIFT = 7;
let SPEED_CHANGE = 0.25;

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height / 2;
// speed
let dx = 2;
let dy = -2;
let paddleHeight = 75;
let paddleWidth = 10;
let paddleX = 0;
let paddleY = canvas.height / 2 - paddleHeight / 2;
let downPressed = false;
let upPressed = false;
let score = 0;
let img = new Image(); // ball image
let imgp = new Image(); // paddle image
img.src = 'ball.png';
imgp.src = 'paddle.png';

// controls
function keyDownHandler(e) {
    if (e.keyCode == KEY_DOWN) {
        downPressed = true;
    }
    else if (e.keyCode == KEY_UP) {
        upPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == KEY_DOWN) {
        downPressed = false;
    }
    else if (e.keyCode == KEY_UP) {
        upPressed = false;
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// game
function drawBall() {
    ctx.drawImage(img, x - ballRadius, y - ballRadius);
}
function drawPaddle() {
    ctx.drawImage(imgp, paddleX, paddleY);
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    document.getElementById('score').innerHTML = score;
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    if (x + dx > canvas.width - ballRadius) {
        dx = -dx;
    }
    else if (x + dx < paddleWidth + ballRadius * 2) {
        if (y > paddleY && y < paddleY + paddleHeight) {
            x = paddleWidth + ballRadius * 2 + SPEED_CHANGE; // fix hit detection issues giving high scores
            dx = -dx;
            score++;

            // makes ball faster after each hit
            dx = dx + SPEED_CHANGE;
            dy = dy + SPEED_CHANGE;
        }
        else if (x + dx < ballRadius) {
            clearInterval(game);
            alert('GAME OVER. SCORE = ' + score);
            document.location.reload(); // resets game
        }
    }
    if (downPressed && paddleY < canvas.height - paddleHeight) {
        paddleY += PADDLE_SHIFT;
    }
    else if (upPressed && paddleY > 0) {
        paddleY -= PADDLE_SHIFT;
    }

    // ball movement
    x += dx;
    y += dy;
}

let game = setInterval(draw, 10);
