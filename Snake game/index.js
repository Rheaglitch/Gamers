const gameBoard = document.querySelector("#gameBoard"); // Untuk mengambil elemen canvas di HTML
const ctx = gameBoard.getContext("2d"); // Untuk mengatur grafik dari game-nya, yaitu 2D
const scoreText = document.querySelector("#scoreText"); // Untuk memanggil elemen scoreText
const resetBtn = document.querySelector("#resetBtn"); // Untuk memanggil tombol reset

const gameWidth = gameBoard.width; // Lebar gameBoard
const gameHeight = gameBoard.height; // Tinggi gameBoard

const boardBackground = "white";
const snakeColor = "pink";
const snakeBorder = "royalblue";
const foodColor = "red";
const unitSize = 25;

let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  { x: unitSize * 5, y: 0 },
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];

// Memulai permainan
window.addEventListener("keydown", changeDirection);
resetGame(); // Memulai game pertama kali

// Fungsi reset game
function resetGame() {
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ];
  generateFood();
  running = true;
  scoreText.textContent = score;
  gameLoop(); // Memulai game loop
}

// Menggambar papan permainan
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

// Menggambar ular
function drawSnake() {
  snake.forEach((snakePart) => {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}

// Menggerakkan ular
function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);

  // Jika ular memakan makanan
  if (head.x === foodX && head.y === foodY) {
    score += 1;
    scoreText.textContent = score;
    generateFood();
  } else {
    snake.pop(); // Menghapus bagian terakhir ular jika tidak makan
  }
}

// Membuat makanan di posisi acak
function generateFood() {
  foodX = Math.floor((Math.random() * gameWidth) / unitSize) * unitSize;
  foodY = Math.floor((Math.random() * gameHeight) / unitSize) * unitSize;
}

// Menggambar makanan
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

// Mengubah arah ular
function changeDirection(event) {
  const keyPressed = event.keyCode;
  // Tombol Panah
  const LEFT_ARROW = 37;
  const UP_ARROW = 38;
  const RIGHT_ARROW = 39;
  const DOWN_ARROW = 40;
  
  // Tombol WASD
  const LEFT_W = 65; // A
  const UP_W = 87; // W
  const RIGHT_W = 68; // D
  const DOWN_W = 83; // S

  const goingUp = yVelocity === -unitSize;
  const goingDown = yVelocity === unitSize;
  const goingRight = xVelocity === unitSize;
  const goingLeft = xVelocity === -unitSize;

  switch (true) {
    case (keyPressed === LEFT_ARROW || keyPressed === LEFT_W) && !goingRight:
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case (keyPressed === UP_ARROW || keyPressed === UP_W) && !goingDown:
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    case (keyPressed === RIGHT_ARROW || keyPressed === RIGHT_W) && !goingLeft:
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case (keyPressed === DOWN_ARROW || keyPressed === DOWN_W) && !goingUp:
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }
}

// Memeriksa apakah ular menabrak dirinya sendiri atau dinding
function checkGameOver() {
  const head = snake[0];
  const hitWall =
    head.x < 0 || head.x >= gameWidth || head.y < 0 || head.y >= gameHeight;

  const hitSelf = snake
    .slice(1)
    .some((segment) => segment.x === head.x && segment.y === head.y);

  if (hitWall || hitSelf) {
    running = false;
  }
}

// Loop permainan
function gameLoop() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      gameLoop();
    }, 150); // Kecepatan permainan
  } else {
    alert(`Game Over! Your score is ${score}`);
  }
}

// Event listener untuk tombol reset
resetBtn.addEventListener("click", resetGame);
