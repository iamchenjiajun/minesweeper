import Square from './square.js';

export default class Board {
    constructor(rows, columns) {
        this.boardElement = document.getElementById("minesweeper");
        this.rows = rows;
        this.columns = columns;
        this.grid;
        this.mineCount = 0;
        this.resetBoard();
    }

    resetBoard() {
        this.create2dArray();
        this.populateWithSquares();
        this.render();
    }

    /**
     * Creates a 2D array in the grid
     */
    create2dArray() {
        this.grid = new Array(this.rows);
        for (let i=0; i<this.rows; i++) {
            this.grid[i] = new Array(this.columns);
        }
    }

    /**
     * Populates the grid with squares
     */
    populateWithSquares() {
        for (let i=0; i<this.rows; i++) {
            for (let j=0; j<this.columns; j++) {
                this.grid[i][j] = new Square();
                if (this.grid[i][j].getIsMine()) {
                    this.mineCount++;
                }
            }
        }

        for (let i=0; i<this.rows; i++) {
            for (let j=0; j<this.columns; j++) {
                let neighbourMineCount = this.getNeighbourMineCount(i, j);
                this.grid[i][j].setNeighbourMineCount(neighbourMineCount);
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
                if (!this.checkValidIndex(rowIndex+i, colIndex+j)) {
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
     * Opens the square at given coordinate
     * @param {Number} rowIndex 
     * @param {Number} colIndex 
     */
    openSquare(rowIndex, colIndex) {
        if (!this.checkValidIndex(rowIndex, colIndex)) return;
        let square = this.grid[rowIndex][colIndex];
        square.open();

        // checks for mine
        if (square.getIsMine()) {
            
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
     * Renders the board
     */
    render() {
        this.clearBoardElement();
        for (let i=0; i<this.rows; i++) {
            let rowElement = document.createElement("div");
            rowElement.className = "minesquare-row";
            for (let j=0; j<this.columns; j++) {
                let square = this.grid[i][j];
                let button = square.makeButton();
                button.onclick = () => {
                    this.openSquare(i, j);
                }
                rowElement.append(button);
            }
            this.boardElement.append(rowElement);
        }
    }
}
