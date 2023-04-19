function sum(...args) {
    let sum = args[0];
    const add = (a, b) => a + b;

    function addAll(...args) {
        return args.reduce(add);
    }

    function addChild(child) {
        sum += child;
        return addChild;
    }
    addChild.valueOf = () => sum;
    addChild.toString = () => sum;

    if (arguments.length === 1) {
        return addChild;
    } else {
        return addAll(...args);
    }
}