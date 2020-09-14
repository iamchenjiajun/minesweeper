import Board from './board.js';

window.addEventListener("load", () => {
    let board = new Board(16, 30, 99);

    document.getElementById("minesweeper-difficulty-1").onclick = () => {
        board = new Board(9, 9, 10);
    }
    document.getElementById("minesweeper-difficulty-2").onclick = () => {
        board = new Board(16, 16, 40);
    }
    document.getElementById("minesweeper-difficulty-3").onclick = () => {
        board = new Board(16, 30, 99);
    }
});
