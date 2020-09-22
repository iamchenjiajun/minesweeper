import Board from './board.js';
import Controls from './controls.js';
import Stats from './stats.js';

export default class Minesweeper {
    constructor() {
        this.minesweeperElement = document.getElementById("minesweeper");

        // create elements
        this.minesweeperElement.append(this.createElementWithId("div", "minesweeper-board"));
        this.minesweeperElement.append(this.createElementWithId("div", "minesweeper-stats"));
        this.minesweeperElement.append(this.createElementWithId("div", "minesweeper-controls"))

        this.board = new Board(16, 30, 99);
        this.controls = new Controls(this.board, document.getElementById("minesweeper-controls"));
        this.stats = new Stats(this.board, document.getElementById("minesweeper-stats"));
    }

    createElementWithId(tagName, id) {
        let element = document.createElement(tagName);
        element.id = id;
        return element;
    }
}
