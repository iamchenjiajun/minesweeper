import Square from './square.js';

export default class Board {
    /**
     * Instantiates an instance of Board
     * @param {Number} rows 
     * @param {Number} columns 
     * @param {Number} mineCount 
     */
    constructor(rows, columns, mineCount) {
        this.boardElement = document.getElementById("minesweeper");
        this.flagCountElement = document.getElementById("minesweeper-flagcount");
        this.safeSquareCountElement = document.getElementById("minesweeper-safesquarecount");

        this.grid;
        this.rows = rows;
        this.columns = columns;
        this.mineCount = mineCount;
        this.safeSquareCount = this.rows * this.columns - mineCount;
        this.flagCount = mineCount;
        this.isFirstClick = true;
        this.gameState = 0;
        this.isClickedMine = false;

        this.create2dSquareArray();
        this.render();
    }

    /**
     * Creates a 2D array in the grid
     */
    create2dSquareArray() {
        this.grid = new Array(this.rows);
        for (let i=0; i<this.rows; i++) {
            this.grid[i] = new Array(this.columns);
            for (let j=0; j<this.columns; j++) {
                this.grid[i][j] = new Square();
            }
        }
    }

    /**
     * Populates the grid with mines
     */
    populateWithMines() {
        let mineAllocationCount = this.mineCount;
        while (mineAllocationCount > 0) {
            let randomRow = Math.floor(Math.random() * this.rows);
            let randomCol = Math.floor(Math.random() * this.columns);
            let randomSquare = this.grid[randomRow][randomCol];

            // check that it's not already a mine, and not one of the opening squares
            if (!randomSquare.getIsMine() && !randomSquare.getIsOpened()) {
                mineAllocationCount--;
                randomSquare.setIsMine(true);
            }
        }
    }

    /**
     * Clears the HTML element
     */
    clearBoardElement() {
        this.boardElement.innerHTML = '';
    }

    /**
     * Checks if a given coordinate is valid
     * @param {Number} rowIndex 
     * @param {Number} colIndex 
     */
    checkValidIndex(rowIndex, colIndex) {
        if (rowIndex < 0 || rowIndex >= this.rows) return false;
        if (colIndex < 0 || colIndex >= this.columns) return false;

        return true;
    }

    /**
     * Calls a function on all squares adjacent to given coordinate
     * @param {Number} rowIndex 
     * @param {Number} colIndex 
     * @param {Function} neighbourFunction 
     */
    loopNeighbours(rowIndex, colIndex, neighbourFunction) {
        for (let i=-1; i<=1; i++) {
            for (let j=-1; j<=1; j++) {
                // check within range
                if (!this.checkValidIndex(rowIndex+i, colIndex+j)) {
                    continue;
                }

                // prevent looping self
                if (i === 0 && j === 0) {
                    continue;
                }
                neighbourFunction(rowIndex+i, colIndex+j);
            }
        }
    }

    /**
     * Returns the number of mines around a square at a given coordinate
     * @param {Number} rowIndex 
     * @param {Number} colIndex 
     */
    getNeighbourMineCount(rowIndex, colIndex) {
        let count = 0;
        this.loopNeighbours(rowIndex, colIndex, (neighbourRowIndex, neighbourColIndex) => {
            if (this.grid[neighbourRowIndex][neighbourColIndex].getIsMine()) {
                count++;
            }
        });
        return count;
    }

    /**
     * Returns the number of flagged neighbours around a square at a given coordinate
     * @param {Number} rowIndex 
     * @param {Number} colIndex 
     */
    getNeighbourFlagCount(rowIndex, colIndex) {
        let count = 0;
        this.loopNeighbours(rowIndex, colIndex, (neighbourRowIndex, neighbourColIndex) => {
            let neighbourSquare = this.grid[neighbourRowIndex][neighbourColIndex];
            if (neighbourSquare.getIsFlagged()) {
                count++;
            }
        });
        return count;
    }

    /**
     * Populates squares with their neighbour mine count
     */
    populateNeighbourMineCount() {
        for (let i=0; i<this.rows; i++) {
            for (let j=0; j<this.columns; j++) {
                let neighbourMineCount = this.getNeighbourMineCount(i, j);
                this.grid[i][j].setNeighbourMineCount(neighbourMineCount);
            }
        }
    }
    
    /**
     * Reveals all mines on the board
     */
    revealMines() {
        for (let i=0; i<this.rows; i++) {
            for (let j=0; j<this.columns; j++) {
                let square = this.grid[i][j];
                if (square.getIsMine()) {
                    square.open();
                }
            }
        }

        this.render();
    }

    /**
     * Opens the square and its neighbours at given coordinate, then generate mines
     * @param {Number} rowIndex 
     * @param {Number} colIndex 
     */
    openSquareFirstClick(rowIndex, colIndex) {
        // open the mines so they cannot be set to mines by mine allocation
        this.grid[rowIndex][colIndex].setIsOpened(true);
        this.safeSquareCount--;
        this.loopNeighbours(rowIndex, colIndex, (neighbourRowIndex, neighbourColIndex) => {
            this.grid[neighbourRowIndex][neighbourColIndex].setIsOpened(true);
            this.safeSquareCount--;
        });
        this.populateWithMines();
        this.populateNeighbourMineCount();
        this.isFirstClick = false;
    }

    /**
     * Opens the square at given coordinate
     * @param {Number} rowIndex 
     * @param {Number} colIndex 
     */
    openSquare(rowIndex, colIndex) {
        if (!this.checkValidIndex(rowIndex, colIndex)) return;
        let square = this.grid[rowIndex][colIndex];
        if (square.getIsFlagged()) return;

        // set square count
        if (!square.getIsOpened()) {
            this.safeSquareCount--;
        }

        // open the square
        square.open();

        // checks for mine
        if (square.getIsMine()) {
            this.revealMines();
            this.isClickedMine = true;
            return;
        }

        // open neighbouring squares if current square is not surrounded by squares
        if (square.getNeighbourMineCount() === 0) {
            this.loopNeighbours(rowIndex, colIndex, (neighbourRowIndex, neighbourColIndex)=> {
                if (!this.grid[neighbourRowIndex][neighbourColIndex].getIsOpened()) {
                    this.openSquare(neighbourRowIndex, neighbourColIndex);
                }
            });
        }

        // re-render the board
        this.render();
    }

    /**
     * Flags a square at a given coordinate
     * @param {Number} rowIndex 
     * @param {Number} colIndex 
     */
    flagSquare(rowIndex, colIndex) {
        let square = this.grid[rowIndex][colIndex];

        // Guard clauses
        if (square.getIsOpened()) {
            return;
        } else if (this.isFirstClick) {
            return;
        }

        if (square.getIsFlagged()) {
            square.setIsFlagged(false);
            this.flagCount++;
        } else if (this.flagCount > 0) {
            square.setIsFlagged(true);
            this.flagCount--;
        }

        this.render();
    }

    /**
     * Chords a square at a given coordinate
     * @param {Number} rowIndex 
     * @param {Number} colIndex 
     */
    chordSquare(rowIndex, colIndex) {
        let square = this.grid[rowIndex][colIndex];
        if (!square.getIsOpened()) {
            return;
        }

        if (this.getNeighbourFlagCount(rowIndex, colIndex) === square.getNeighbourMineCount()) {
            this.loopNeighbours(rowIndex, colIndex, (neighbourRowIndex, neighbourColIndex) => {
                this.openSquare(neighbourRowIndex, neighbourColIndex);
            });
        }
    }

    /**
     * Checks the state of the game
     */
    checkGameState() {
        if (this.isClickedMine) {
            this.gameState = -1;
            alert("You lose!");
        } else if (this.safeSquareCount === 0) {
            this.gameState = 1;
            alert("You win!");
        }
    }

    /**
     * Renders the board
     */
    render() {
        this.renderStats();
        this.clearBoardElement();
        for (let i=0; i<this.rows; i++) {
            let rowElement = document.createElement("div");
            rowElement.className = "minesquare-row";
            for (let j=0; j<this.columns; j++) {
                let square = this.grid[i][j];
                let button = square.makeButton();

                // left click
                button.onclick = () => {
                    if (this.gameState !== 0) return;
                    if (this.isFirstClick) {
                        this.openSquareFirstClick(i, j);
                    }
                    if (square.getIsOpened()) this.chordSquare(i, j);
                    else this.openSquare(i, j);
                    this.checkGameState();
                }

                // right click
                button.oncontextmenu = (e) => {
                    e.preventDefault();
                    this.flagSquare(i, j);
                }
                rowElement.append(button);
            }
            this.boardElement.append(rowElement);
        }
    }

    /**
     * Renders the flag/mine count
     */
    renderStats() {
        this.flagCountElement.textContent = `Flags remaining: ${this.flagCount}`;
        this.safeSquareCountElement.textContent = `Safe squares remaining: ${this.safeSquareCount}`;
    }
}
