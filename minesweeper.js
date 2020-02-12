document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {

}

function startGame() {

  //Click listeners
  document.addEventListener("click", checkForWin)
  document.addEventListener("contextmenu", checkForWin)

  //Reset button listener
  document.getElementById('reset').addEventListener("click", boardReset)

  //Radio button listener
  let radios = document.getElementsByName('grid-size')
  for(let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("click", boardReset)
  }

  //Checks grid-size selection
  let size = document.querySelector('input[name="grid-size"]:checked').value;

  generateBoard(size)

  for (let i = 0; i < board.cells.length; i++) {
    board.cells[i]["surroundingMines"] = countSurroundingMines(board.cells[i])
  }

  //Game initialiser
  lib.initBoard()
}

function generateBoard(num) {

  board["cells"] = []
  let row = 0
  let col = 0
  let squares = num * num

  for (let i = 0; i < squares; i++) {
    board.cells[i] = {
      row: row,
      col: col,
      isMine: false,
      isMarked: false,
      hidden: true
    }
    if (row < num - 1) {
      row += 1
    } else {
      row = 0
      col += 1
    }
  }

  //Randomly generates mine positions
  for (let i = 0; i < num; i++) {
    cell = Math.floor((Math.random() * squares))
    board.cells[cell].isMine = true
  }
}

//Checks for win condition
function checkForWin() {

  let winCondition = 0

  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && board.cells[i].isMarked) {
      winCondition += 1
    } else if (!board.cells[i].isMine && !board.cells[i].hidden) {
      winCondition += 1
    }
  }

  if (winCondition == board.cells.length) {
    lib.displayMessage('You win!')
  }
}

function countSurroundingMines(cell) {

  let count = 0

  var surrounding = lib.getSurroundingCells(cell.row, cell.col)

  for (let i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine) {
      count += 1
    }
  }

  return count
}

//reset board to defaults
function boardReset() {
  document.getElementById('grid').innerHTML = ""
  startGame()
}