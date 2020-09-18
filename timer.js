export default class Timer {
    constructor() {
        this.startTime = Date.now();
        this.elapsed;
    }

    getTiming() {
        this.elapsed = Date.now() - this.startTime;
        return this.elapsed;
    }
}
