document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const resetButton = document.getElementById('reset-button');
    const modal = document.getElementById('modal');
    const winnerMessage = document.getElementById('winner-message');
    const applauseSound = document.getElementById('applause-sound');

    let currentPlayer = 'X';
    let cells = Array.from({ length: 9 }).fill('');

    // Function to create the game board
    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    // Function to handle cell clicks
    function handleCellClick(event) {
        const cellIndex = event.target.dataset.index;
        if (cells[cellIndex] === '') {
            cells[cellIndex] = currentPlayer;
            event.target.textContent = currentPlayer;
            if (checkWinner()) {
                showWinner(currentPlayer);
                applauseSound.play();
            } else if (isBoardFull()) {
                alert('It\'s a draw!');
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    // Function to check for a winner
    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winningCombos.some(combo => {
            return combo.every(index => cells[index] === currentPlayer);
        });
    }

    // Function to check if the board is full
    function isBoardFull() {
        return cells.every(cell => cell !== '');
    }

    // Function to reset the game
    function resetGame() {
        cells = Array.from({ length: 9 }).fill('');
        currentPlayer = 'X';
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
        });
    }

    // Function to display the winner in the modal
    function showWinner(player) {
        modal.style.display = 'block';
        winnerMessage.innerHTML = `<span style="color: ${player === 'X' ? 'blue' : 'red'};">Player ${player}</span> wins!`;
    }

    // Event listener for reset button
    resetButton.addEventListener('click', resetGame);

    // Close the modal when clicking on the close button
    document.querySelector('.close').addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Initialize the game
    createBoard();
});
