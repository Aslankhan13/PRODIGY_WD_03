let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
  const cellIndex = parseInt(event.target.id.split('-')[1]);
  if (gameBoard[cellIndex] === '') {
    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      statusDisplay.textContent = `Player ${currentPlayer} wins!`;
      cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    } else if (checkDraw()) {
      statusDisplay.textContent = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => gameBoard[index] === player);
  });
}

function checkDraw() {
  return gameBoard.every(cell => cell !== '');
}
