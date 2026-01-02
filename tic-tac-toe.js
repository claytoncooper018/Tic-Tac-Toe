// ---- Create game container ----
const container = document.createElement('div');
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.alignItems = 'center';
container.style.marginTop = '50px';
document.body.appendChild(container);

// ---- Create title ----
const title = document.createElement('h1');
title.textContent = 'Tic Tac Toe';
title.style.fontFamily = 'Arial, sans-serif';
title.style.color = '#333';
container.appendChild(title);

// ---- Create board ----
const boardContainer = document.createElement('div');
boardContainer.style.display = 'grid';
boardContainer.style.gridTemplateColumns = 'repeat(3, 100px)';
boardContainer.style.gridGap = '5px';
container.appendChild(boardContainer);

// ---- Create restart button ----
const restartBtn = document.createElement('button');
restartBtn.textContent = 'Restart Game';
restartBtn.style.marginTop = '20px';
restartBtn.style.padding = '10px 20px';
restartBtn.style.fontSize = '16px';
restartBtn.style.cursor = 'pointer';
container.appendChild(restartBtn);

// ---- Game logic ----
let board = ['', '', '', '', '', '', '', '', ''];
let turn = 'X';

function checkWinner() {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (let [a,b,c] of winPatterns) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes('') ? null : 'Draw';
}

function createCell(index) {
    const cell = document.createElement('div');
    cell.style.width = '100px';
    cell.style.height = '100px';
    cell.style.border = '2px solid #333';
    cell.style.display = 'flex';
    cell.style.alignItems = 'center';
    cell.style.justifyContent = 'center';
    cell.style.fontSize = '2em';
    cell.style.cursor = 'pointer';
    cell.style.transition = 'background-color 0.2s';
    
    // Hover effect
    cell.addEventListener('mouseenter', () => {
        if (!cell.textContent) cell.style.backgroundColor = '#f0f0f0';
    });
    cell.addEventListener('mouseleave', () => {
        cell.style.backgroundColor = 'white';
    });

    // Click logic
    cell.addEventListener('click', () => {
        if (board[index] !== '') return;
        board[index] = turn;
        cell.textContent = turn;

        const winner = checkWinner();
        if (winner) {
            setTimeout(() => {
                if (winner === 'Draw') alert("It's a Draw!");
                else alert(`${winner} Wins!`);
                restartGame();
            }, 100);
        }

        turn = turn === 'X' ? 'O' : 'X';
    });

    boardContainer.appendChild(cell);
}

// ---- Restart function ----
function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    boardContainer.innerHTML = '';
    for (let i = 0; i < 9; i++) createCell(i);
}

restartBtn.addEventListener('click', restartGame);

// ---- Initialize game ----
restartGame();
