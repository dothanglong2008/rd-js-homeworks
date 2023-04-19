// Your code goes here
const task1 = require('../src/get-bigest-number');

describe('Test getBiggestNumber Function', function () {
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;
    const FOUR = 4;
    const FIVE = 5;
    const SIX = 6;
    const SEVEN = 7;
    const EIGHT = 8;
    const NINE = 9;
    const TEN = 10;
    const ELEVEN = 11;

    it('should check function accepts 2 elements', async function () {
        const EXPECTED_RESULT = THREE;
        const result = task1.getBiggestNumber(ONE, THREE);
        expect(result).toBe(EXPECTED_RESULT);
    });
    it('should check function accepts 10 elements', async function () {
        const EXPECTED_RESULT = TEN;
        const result = task1.getBiggestNumber(ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN);
        expect(result).toBe(EXPECTED_RESULT);
    });
    it('should check function accepts 5 elements', async function () {
        const EXPECTED_RESULT = FIVE;
        const result = task1.getBiggestNumber(ONE, TWO, THREE, FOUR, FIVE);
        expect(result).toBe(EXPECTED_RESULT);
    });
    it('should return the biggest value', async function () {
        const EXPECTED_RESULT = THREE;
        const result = task1.getBiggestNumber(ONE, THREE, TWO);
        expect(result).toBe(EXPECTED_RESULT);
    });
    it('should throw Error \'Wrong argument type\'', async function () {
        expect(function () {
            task1.getBiggestNumber('a');
        }).toThrowError(Error, 'Wrong argument type');
    });
    it('should throw Error \'Not enough arguments\'', async function () {
        expect(function () {
            task1.getBiggestNumber(ONE);
        }).toThrowError(Error, 'Not enough arguments');
    });
    it('should throw Error \'Too many arguments\'', async function () {
        expect(function () {
            task1.getBiggestNumber(ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, ELEVEN);
        }).toThrowError(Error, 'Too many arguments');
    });
})