import Board from './board.js';

window.addEventListener("load", () => {
    let board = new Board(16, 16);
    board.render();
});
