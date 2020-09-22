import Board from './board.js';
import Controls from './controls.js';

export default class Minesweeper {
    constructor() {
        let minesweeperElement = document.getElementById("minesweeper");

        // main board
        minesweeperElement.append(this.createElementWithId("div", "minesweeper-board"));

        // stats
        minesweeperElement.append(this.createElementWithId("div", "minesweeper-flagcount"));
        minesweeperElement.append(this.createElementWithId("div", "minesweeper-safesquarecount"));
        minesweeperElement.append(this.createElementWithId("div", "minesweeper-timer"));

        // controls
        minesweeperElement.append(this.createElementWithId("div", "minesweeper-controls"))

        // setup
        this.board = new Board(16, 30, 99);
        this.controls = new Controls(this.board, document.getElementById("minesweeper-controls"));
    }

    createElementWithId(tagName, id) {
        let element = document.createElement(tagName);
        element.id = id;
        return element;
    }
}
