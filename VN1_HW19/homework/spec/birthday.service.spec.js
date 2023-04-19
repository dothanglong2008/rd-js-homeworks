// Your code goes here
const BirthdayService = require('../src/birthday.service');

describe('Test BirthdayService Class', function () {
    it('should check howLongToMyBirthday function returns a Promise object ', async function () {
        const ASSUMED_MONTH = 8;
        const ASSUMED_DATE = 20;
        const birthday = new Date();
        birthday.setMonth(ASSUMED_MONTH - 1, ASSUMED_DATE);
        const result = new BirthdayService().howLongToMyBirthday(birthday);
        expect(result).toBeInstanceOf(Promise);
    });
    it('should howLongToMyBirthday function log \'Hooray!!! It is today!', async function () {
        const birthday = new Date();
        const EXPECTED_RESULT = `Hooray!!! It is today!`;
        const service = new BirthdayService();
        const result = await service.howLongToMyBirthday(birthday);
        expect(result).toBe(EXPECTED_RESULT);
    });
    it('should howLongToMyBirthday function log \'Oh, you have celebrated it xxxx day/s ago, don\'t you remember?',
        async function () {
            const MILLISECONDS = 1000;
            const SECONDS = 3600;
            const HOURS = 24;
            const ASSUMED_MONTH = 1;
            const ASSUMED_DATE = 2;
            const today = new Date();
            const birthday = new Date();
            birthday.setMonth(ASSUMED_MONTH - 1, ASSUMED_DATE);
            const days = Math.abs(Math.round((today - birthday) / MILLISECONDS / SECONDS / HOURS));

            const EXPECTED_RESULT = `Oh, you have celebrated it ${days} day/s ago, don't you remember?`;
            const service = new BirthdayService();
            const result = await service.howLongToMyBirthday(birthday);
            expect(result).toBe(EXPECTED_RESULT);
        });
    it('should howLongToMyBirthday function log \'Soon...Please, wait just xxxx day/days',
        async function () {
            const MILLISECONDS = 1000;
            const SECONDS = 3600;
            const HOURS = 24;
            const ASSUMED_MONTH = 5;
            const ASSUMED_DATE = 18;
            const today = new Date();
            const birthday = new Date();
            birthday.setMonth(ASSUMED_MONTH - 1, ASSUMED_DATE);
            const days = Math.abs(Math.round((today - birthday) / MILLISECONDS / SECONDS / HOURS));

            const EXPECTED_RESULT = `Soon...Please, wait just ${days} day/days`;
            const service = new BirthdayService();
            const result = await service.howLongToMyBirthday(birthday);
            expect(result).toBe(EXPECTED_RESULT);
        });
    it('should throw Error \'Wrong argument!\'', async function () {
        let error;
        const birthday = 'string';
        const service = new BirthdayService();
        try {
            await service.howLongToMyBirthday(birthday)
        } catch (e) {
            error = e;
        }
        expect(error).toEqual(new Error('Wrong argument!'));
    });
})