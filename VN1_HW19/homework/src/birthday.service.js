// Your code goes here
class BirthdayService {
    async howLongToMyBirthday(date) {
        const MILLISECONDS = 1000;
        const SECONDS = 3600;
        const HOURS = 24;
        const TIME_OUT = 100;
        const SIX_MONTHS_DAYS = 180;
        let today = new Date();
        let days = 0;
        if (!(date instanceof Date)) {
            throw new Error('Wrong argument!');
        }
        await new Promise((resolve) => {
            setTimeout(() => {
                days = Math.round((today - date) / MILLISECONDS / SECONDS / HOURS);
                resolve();
            }, TIME_OUT);
        })

        if (days === 0) {
            return this.congratulateWithBirthday();
        } else if (days !== 0 && Math.abs(days) < SIX_MONTHS_DAYS) {
            return this.notifyWaitingTime(days);
        }
    }
    congratulateWithBirthday() {
        return this.logger('Hooray!!! It is today!');
    }
    notifyWaitingTime(waitingTime) {
        if (waitingTime < 0) {
            return this.logger(`Soon...Please, wait just ${Math.abs(waitingTime)} day/days`);
        } else if (waitingTime > 0) {
            return this.logger(`Oh, you have celebrated it ${waitingTime} day/s ago, don't you remember?`);
        }
    }
    logger(content) {
        console.log(content);
        return content;
    }
}

module.exports = BirthdayService;