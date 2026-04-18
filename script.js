const board = document.getElementById("board");
const statusText = document.getElementById("status");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");

let currentPlayer = "❌";   // Start with ❌
let gameActive = true;
let cells = [];

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Create Board
function createBoard() {
    board.innerHTML = "";
    cells = [];

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}

// Handle Click
function handleClick(e) {
    const cell = e.target;

    if (cell.textContent !== "" || !gameActive) return;

    cell.textContent = currentPlayer;

    if (checkWinner()) {
        showPopup(`Player ${currentPlayer} Wins! 🎉`);
        gameActive = false;
        return;
    }

    if (isDraw()) {
        showPopup("It's a Draw 🤝");
        gameActive = false;
        return;
    }

    // Switch between ❌ and ⭕
    currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
    statusText.textContent = `PLAYER ${currentPlayer}'S TURN`;
}

// Check Winner
function checkWinner() {
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

// Check Draw
function isDraw() {
    return cells.every(cell => cell.textContent !== "");
}

// Popup Functions
function showPopup(message) {
    popupText.textContent = message;
    popup.style.display = "flex";
}

function hidePopup() {
    popup.style.display = "none";
}

// Reset Game
function resetGame() {
    currentPlayer = "❌";  // Reset to ❌
    gameActive = true;
    statusText.textContent = "PLAYER ❌'S TURN";
    createBoard();
    hidePopup();
}

// Init
createBoard();