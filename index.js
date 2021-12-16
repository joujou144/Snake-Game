// Declare UI vars
let scoreDisplay = document.getElementById("score")
const restartBtn = document.getElementById("restartBtn")
const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

let gameOver = false

class snakeBody {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

let speed = 5 // Initial speed
let squareCount = 20 // Size of each square
let squareSize = canvas.width / squareCount - 2 // Size of snake
let foodSize = canvas.width / squareCount - 10 // size of food
let score = 0

let headX;
let headY;
let snakeParts = [];
let tailLength;
let appleX;
let appleY;
let xDirection;
let yDirection;

function init() {
// Snake head position
  headX = 5
  headY = 2
  snakeParts = []
  tailLength = 2

  // Food position
  appleX = 12
  appleY = 8

  // Snake initial direction
  xDirection = 0
  yDirection = 0

  xDirection = 1
  displayScore()
}

init()

function drawGame() {
  moveSnake()
  gameOver = false
  
  let result = isGameOver()
  if(result) {

    init();
    return
  }

  clearScreen()
    
  generateApple()
  drawApple()
  drawSnake()

  if(score > 4) {
    speed = 8
  }

  if(score > 7) {
    speed = 11
  }

  setTimeout(drawGame, 1000 / speed)

}

function isGameOver() {
  let gameOver = false

  // Game hasnt started
  if (xDirection === 0 && yDirection === 0) {
    return false
  }

  // Hit walls
  if(headX < 0) {
    gameOver = true
  } else if (headX === squareCount) {
    gameOver = true
  } else if (headY < 0) {
    gameOver = true
  } else if (headY === squareCount) {
    gameOver = true
  }

  // Hit snake body parts
  for (let i = 0; i <snakeParts.length; i++) {
    let part = snakeParts[i]
    if(part.x === headX && part.y === headY) {
      gameOver = true
      break
    }
  }

  if(gameOver) {
    // ctx.fillStyle = "yellow"
    ctx.font = "40px Monospace"

    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
    gradient.addColorStop(0.1, "lawngreen")
    gradient.addColorStop(0.5, "blue")
    gradient.addColorStop(0.7, "orangered")

    ctx.fillStyle = gradient
    ctx.fillText("G A M E  O V E R", canvas.width / 15, canvas.height / 2)
  }
  return gameOver

}

function clearScreen() {
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSnake() {
  
  ctx.fillStyle = "magenta"
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i]
    ctx.fillRect(part.x * squareCount, part.y * squareCount, squareSize, squareSize)
  }

  snakeParts.push(new snakeBody(headX, headY)) // add an item at the end (last) which is next to the head
  while (snakeParts.length > tailLength) {
    snakeParts.shift() // remove furthest item from the snake parts
  }

  ctx.fillStyle = "lime"
  ctx.fillRect(headX * squareCount, headY * squareCount, squareSize, squareSize)

}


function moveSnake() {
  headX = headX + xDirection
  headY = headY + yDirection
}

function drawApple() {
  ctx.fillStyle = "red"
  ctx.fillRect(appleX * squareCount, appleY * squareCount, foodSize, foodSize)
}

// When Snake eats apple
function generateApple() {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * squareCount)
    appleY = Math.floor(Math.random() * squareCount)
    tailLength++
    score++
    displayScore()
  }
}

function displayScore() {
  scoreDisplay.textContent = score

  if (score > 4) {
    score += 1
  }

  if (score > 9) {
    score += 1
  }
}

document.addEventListener("keyup", control)

function control(e) {
  // up 
  if (e.keyCode === 38) {
    if (yDirection === 1) 
      return;
    xDirection = 0
    yDirection = -1
  }
  
  // right
  if (e.keyCode === 39) {
    if(xDirection === -1)
      return;
    xDirection = 1
    yDirection = 0
  } 
  
   // left
  if (e.keyCode === 37) {
    if (xDirection === 1)
      return;
    xDirection = -1
    yDirection = 0
  }
  
   // down
  if (e.keyCode === 40) {
    if (yDirection === -1)
      return;
    xDirection = 0
    yDirection = 1
  }
}

drawGame()
restartBtn.addEventListener("click", drawGame);

