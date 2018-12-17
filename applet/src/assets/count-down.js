/**
 * @author Arron
 * @date 20181115
 * @fileoverview 倒计时
 */
export default class CountDown {
    constructor(endTime) {
        this.nowTime = new Date()
        this.endTime = new Date(endTime)
        // this.leftTime = parseInt((this.endTime.getTime() - this.nowTime.getTime()))
        // this.m = this.formate(parseInt((this.leftTime / 60) % 60))
        // this.s = this.formate( parseInt(this.leftTime % 60 ) )
        // return this.leftTime
        return endTime
    }
    formate(time) {
        if (time >= 10) {
            return time
        } else {
            return `0${time}`
        }
    }
    timeDown() {
        if (this.leftTime <= 0) {
            return 'end'
        } else {
            return this.leftTime
        }
    }
    start() {
        setInterval(() => {
            return (this.leftTime - 1000)
        }, 1000);
    }

}
