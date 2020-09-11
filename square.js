export default class Square {
    constructor() {
        this.isOpened = false;
        this.isMine = false;
        this.neighbourMineCount = 0;
        this.isFlagged = false;

        if (Math.random() > 0.9) {
            this.isMine = true;
        }
    }

    getIsOpened() {
        return this.isOpened;
    }

    getIsMine() {
        return this.isMine;
    }

    setNeighbourMineCount(neighbourMineCount) {
        this.neighbourMineCount = neighbourMineCount;
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
        if (this.isFlagged) return "⛳";
        if (this.isOpened === false) return "❓";
        else if (this.isMine === true) return "⭐";
        else if (this.neighbourMineCount === 0) return " ";

        switch(this.neighbourMineCount) {
            case 1: return "1️⃣";
            case 2: return "2️⃣";
            case 3: return "3️⃣";
            case 4: return "4️⃣";
            case 5: return "5️⃣";
            case 6: return "6️⃣";
            case 7: return "7️⃣";
            case 8: return "8️⃣";
            default: return this.neighbourMineCount;
        }
    }

    makeButton() {
        let button = document.createElement("button");
        let content = document.createElement("p");

        content.className = "minesquare-content";
        button.className = "minesquare";
        
        content.textContent = this.getButtonContents();
        
        button.append(content);
        return button;
    }
}