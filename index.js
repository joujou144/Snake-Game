// Declare UI vars
let scoreDisplay = document.getElementById("score")
const startButton = document.getElementById("startBtn");
const upBtn=document.querySelector('.up')
const downBtn=document.querySelector('.down');
const leftBtn=document.querySelector('.left');
const rightBtn=document.querySelector('.right');
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
// controls for direction
const direction={
  moveRight(){
    if (xDirection === -1)
      return;
    xDirection = 1;
    yDirection = 0;
  },
  moveLeft(){
    if (xDirection === 1)
      return;
    xDirection = -1
    yDirection = 0;
  },
  moveUp(){
    if (yDirection === 1)
      return;
    xDirection = 0;
    yDirection = -1
  },
  moveDown(){
    if (yDirection === -1)
      return;
    xDirection = 0
    yDirection = 1;
  }
}
function snake() {
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
  
  // the snake should move right when the game start
  direction.moveRight();
  
}

 snake()

function drawGame() {
  
  moveSnake()
  gameOver = false
  
  let result = isGameOver()
  if(result) {

    snake();
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
 

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
   gameOver = false

  // Game hasnt started
  if (xDirection === 0 && yDirection === 0) {
    return 
  }

  // Hit walls
  // if(headX < 0 ) {
  //   gameOver = true
  // } else if (headX === squareCount) {
  //   gameOver = true
  // } else if (headY < 0) {
  //   gameOver = true
  // } else if (headY === squareCount) {
  //   gameOver = true
  // }
  // Hit walls (refactored)
  if(headX < 0 || headX === squareCount) {
    gameOver = true;
  } else if (headY < 0 || headY === squareCount) {
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
    ctx.fillText("G A M E  O V E R", canvas.width / 15, canvas.height / 2);
    
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
    displayScore();
  }
}
function displayScore(){
    scoreDisplay.textContent = score
  
}
document.addEventListener("keyup", control)

function control(e) {
  // up 
  if (e.keyCode === 38) {
    direction.moveUp();
  }
  
  // right
  if (e.keyCode === 39) {
    direction.moveRight();
  } 
  
   // left
  if (e.keyCode === 37) {
    direction.moveLeft()
  }
  
   // down
  if (e.keyCode === 40) {
    direction.moveDown();
  }
}

drawGame()
startButton.addEventListener("click", drawGame);
upBtn.addEventListener('click',()=>{
  direction.moveUp()
})

downBtn.addEventListener('click',()=>{
  direction.moveDown()
})

leftBtn.addEventListener('click',()=>{
  direction.moveLeft()
})

rightBtn.addEventListener('click',()=>{
  direction.moveRight()
})

