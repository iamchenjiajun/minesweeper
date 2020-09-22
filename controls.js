import Board from './board.js';

export default class Controls {
    constructor(board, controlElement) {
        this.board = board;
        this.controlElement = controlElement;

        this.buttonDifficulty1 = document.createElement("button");
        this.buttonDifficulty1.id = "minesweeper-difficulty-1";
        this.buttonDifficulty1.textContent = "Beginner";
        this.controlElement.append(this.buttonDifficulty1);

        this.buttonDifficulty2 = document.createElement("button");
        this.buttonDifficulty2.id = "minesweeper-difficulty-2";
        this.buttonDifficulty2.textContent = "Intermediate";
        this.controlElement.append(this.buttonDifficulty2);

        this.buttonDifficulty3 = document.createElement("button");
        this.buttonDifficulty3.id = "minesweeper-difficulty-3";
        this.buttonDifficulty3.textContent = "Expert";
        this.controlElement.append(this.buttonDifficulty3);

        this.buttonDifficulty1.onclick = () => {
            this.board = new Board(9, 9, 10);
        }

        this.buttonDifficulty2.onclick = () => {
            this.board = new Board(16, 16, 40);
        }

        this.buttonDifficulty3.onclick = () => {
            this.board = new Board(16, 30, 99);
        }
    }
}
