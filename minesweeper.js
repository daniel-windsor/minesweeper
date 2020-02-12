document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {

}

function startGame() {
  document.addEventListener("click", checkForWin)
  document.addEventListener("contextmenu", checkForWin)

  generateBoard(6)

  for (let i = 0; i < board.cells.length; i++) {
    board.cells[i]["surroundingMines"] = countSurroundingMines(board.cells[i])
  }

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?

function generateBoard(num) {

  board["cells"] = []
  let row = 0
  let col = 0
  let squares = num*num

  for (let i = 0; i < squares; i++) {
    board.cells[i] = {
      row: row,
      col: col,
      isMine: false,
      isMarked: false,
      hidden: true
    }
    if (row < num-1) {
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

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)

}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {

  let count = 0

  var surrounding = lib.getSurroundingCells(cell.row, cell.col)

  for (let i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine) {
      count += 1
    }
  }

  // console.log(count)

  return count

}

//resets board to defaults
function boardReset() {
  document.getElementById('grid').innerHTML = ""
  startGame()
}