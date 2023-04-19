class MyPromise extends Promise {

    async synchThen(callback) {
        return callback();
    }
    async then(callback) {
        return setTimeout(() => { callback() }, 0);
    }
}

let promise = new MyPromise(
    (resolve) => {
        console.log(1);
        resolve();
    }
).synchThen(
    () => {
        console.log(2);
    }
).then(
    () => {
        console.log(3);
    }
)
console.log(4);
//1, 2, 4, 3