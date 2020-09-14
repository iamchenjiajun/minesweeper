import Board from './board.js';

window.addEventListener("load", () => {
    let board = new Board(16, 30, 99);

    document.getElementById("minesweeper-newgame").onclick = () => {
        board = new Board(16, 30, 99);
    }
});
