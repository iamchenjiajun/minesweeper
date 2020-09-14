export default class Square {
    constructor() {
        this.isOpened = false;
        this.isMine = false;
        this.neighbourMineCount = 0;
        this.isFlagged = false;
    }

    getIsOpened() {
        return this.isOpened;
    }

    getIsFlagged() {
        return this.isFlagged;
    }

    getIsMine() {
        return this.isMine;
    }

    setNeighbourMineCount(neighbourMineCount) {
        this.neighbourMineCount = neighbourMineCount;
    }

    setIsMine(isMine) {
        this.isMine = isMine;
    }

    setIsOpened(isOpened) {
        this.isOpened = isOpened;
    }

    getNeighbourMineCount() {
        return this.neighbourMineCount;
    }

    open() {
        if (!this.isFlagged) {
            this.isOpened = true;
        }
    }

    flag() {
        if (!this.isOpened) {
            this.isFlagged ^= true;
        }
    }

    getButtonContents() {
        if (this.isFlagged) return "🔺";
        if (this.isOpened === false) return "";
        else if (this.isMine === true) return "⭐";
        else if (this.neighbourMineCount === 0) return " ";

        return this.neighbourMineCount;
    }

    makeButton() {
        let button = document.createElement("button");
        let content = document.createElement("p");

        content.className = "minesquare-content";
        button.classList = "minesquare";
        
        content.textContent = this.getButtonContents();
        content.style.fontSize = "18px";
        switch(this.getButtonContents()) {
            case 1:
                button.style.color = "skyblue";
                break;
            case 2:
                button.style.color = "green";
                break;
            case 3:
                button.style.color = "orange";
                break;
            case 4:
                button.style.color = "blue";
                break;
            case 5:
                button.style.color = "red";
                break;
            case 6:
                button.style.color = "teal";
                break;
            case 7:
                button.style.color = "brown";
                break;
            case 8:
                button.style.color = "yellow";
                break;
        }

        if (!this.isOpened && !this.isFlagged) {
            button.style.backgroundColor = "#5c3535";
        }
        
        button.append(content);
        return button;
    }
}