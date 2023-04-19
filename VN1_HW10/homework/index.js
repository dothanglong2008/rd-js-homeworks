const isEquals = function (a, b) {
    return a === b;
};
const isBigger = function (a, b) {
    return a > b;
};
const storeNames = function (...args) {
    return args;
}
const getDifference = function (a, b) {
    if (typeof (a + b) === 'number') {
        return Array.from(arguments)
            .sort((a, b) => b - a)
            .reduce((a, b) => a - b);
    }
}
const negativeCount = function (array) {
    return array.filter((el) => el < 0).length;
}
const letterCount = function (str1, str2) {
    return str1.split('').filter(el => el === str2).length;
}

const countPoints = function (collection) {
    const WIN_POINT = 3;
    const LOST_POINT = 0;
    const DRAW_POINT = 1;
    const count = (x, y) => {
        if (x > y) {
            return WIN_POINT;
        } else if (x < y) {
            return LOST_POINT;
        } else {
            return DRAW_POINT;
        }
    };
    return collection.map(
            el => el.split(':')
            .map(el => Number(el))
            .reduce(count))
        .reduce((x, y) => x + y);
}