class ReversePromise extends Promise {
    constructor(callback) {
        super(callback);
        this.thenCallbacksList = [];
    }
    then(callback) {
        this.thenCallbacksList.push(callback);
        return this;
    }
    print() {
        let temp = [];
        let length = this.thenCallbacksList.length;
        for (let i = 0; i < length; i++) {
            let reverseCallback = this.thenCallbacksList.pop();
            temp.push(reverseCallback);
        }
        return temp.forEach(callback => {
            callback();
        });
    }
}

let promise = new ReversePromise(
        (resolve) => {
            console.log(1);
            resolve();
        }
    )
    .then(() => console.log(2))
    .then(() => console.log(3))
    .then(() => console.log(4))
    .print()

//1, 4, 3, 2