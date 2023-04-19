// Your code goes here
const task1 = {
    getBiggestNumber(...args) {
        const MIN = 2;
        const MAX = 10;
        args.forEach(element => {
            if (typeof element !== 'number') {
                throw new Error('Wrong argument type');
            }
            if (args.length < MIN) {
                throw new Error('Not enough arguments');
            }
            if (args.length > MAX) {
                throw new Error('Too many arguments');
            }
        })
        return args.reduce((x, y) => Math.max(x, y), 0);
    }

}

module.exports = task1;