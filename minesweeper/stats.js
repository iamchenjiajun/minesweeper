export default class Stats {
    constructor(board, statsElement) {
        this.board = board;
        this.statsElement = statsElement;
        this.statsElement.append(this.createElementWithId("div", "minesweeper-flagcount"));
        this.statsElement.append(this.createElementWithId("div", "minesweeper-safesquarecount"));
        this.statsElement.append(this.createElementWithId("div", "minesweeper-timer"));

        this.flagCountElement = document.getElementById("minesweeper-flagcount");
        this.safeSquareCountElement = document.getElementById("minesweeper-safesquarecount");
        this.timerElement = document.getElementById("minesweeper-timer");

        setInterval(this.renderStats.bind(this), 1000/60);
    }

    /**
     * Renders the flag/mine count
     */
    renderStats() {
        this.flagCountElement.textContent = `Flags remaining: ${this.board.flagCount}`;
        this.safeSquareCountElement.textContent = `Safe squares remaining: ${this.board.safeSquareCount}`;
        this.timerElement.textContent = `Time elapsed - ${this.board.timer.getTiming()/1000}`;
    }

    createElementWithId(tagName, id) {
        let element = document.createElement(tagName);
        element.id = id;
        return element;
    }
}
