export default class Timer {
    constructor() {
        this.isStarted = false;
        this.isStopped = false;
        this.startTime;
        this.elapsed;
    }

    /**
     * Starts the timer
     */
    startTimer() {
        this.isStarted = true;
        this.startTime = Date.now();
    }

    /**
     * Stops the timer
     */
    stopTimer() {
        this.isStopped = true;
        this.elapsed = Date.now() - this.startTime;
    }

    /**
     * Returns the time elapsed since the timer is started
     */
    getTiming() {
        if (this.isStopped) {
            return this.elapsed;
        }
        if (this.isStarted) {
            return Date.now() - this.startTime;
        }

        return 0;
    }
}
