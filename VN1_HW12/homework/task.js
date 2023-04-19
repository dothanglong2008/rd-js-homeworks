function myNew(constructor, ...args) {
    let constructorObject = Object.create(constructor);
    Object.setPrototypeOf(constructorObject, constructor.prototype)
    let newObject = constructor.apply(constructorObject, args);
    if (typeof newObject === 'object') {
        return newObject;
    }
    return constructorObject;
}