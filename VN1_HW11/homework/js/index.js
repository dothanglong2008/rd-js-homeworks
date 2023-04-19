'use strict';

/**
 * Class
 * @constructor
 * @param size - size of pizza
 * @param type - type of pizza
 * @throws {PizzaException} - in case of improper use
 */
function Pizza(size, type) {
    const PIZZA_PROPERTIES_NUMBER = 2;

    this.size = size;
    this.type = type;
    this.extraIngredients = [];

    this.allowedSizes = Pizza.allowedSizes;
    this.allowedTypes = Pizza.allowedTypes;
    this.allowedExtraIngredients = Pizza.allowedExtraIngredients;

    this.validateIngredient = function(ingredient) {
        if (arguments.length > 1 ||
            !this.allowedExtraIngredients.includes(ingredient)) {
            throw new PizzaException('Invalid ingredient');
        }
    }

    if (arguments.length < PIZZA_PROPERTIES_NUMBER) {
        throw new PizzaException('Required two arguments, given: 1');
    }

    if (!this.allowedSizes.includes(this.size) || !this.allowedTypes.includes(this.type)) {
        throw new PizzaException('Invalid type');
    }

    this.addExtraIngredient = function(ingredient) {
        this.validateIngredient(ingredient);

        if (this.extraIngredients.includes(ingredient)) {
            throw new PizzaException('Duplicate ingredient');
        } else {
            this.extraIngredients.push(ingredient);
        }
    }

    this.getExtraIngredients = function() {
        return this.extraIngredients;
    }

    this.removeExtraIngredient = function(ingredient) {
        this.validateIngredient(ingredient);

        if (!this.extraIngredients.includes(ingredient)) {
            throw new PizzaException('Invalid ingredient');
        } else {
            const index = this.extraIngredients.indexOf(ingredient);
            this.extraIngredients.splice(index, 1);
        }
    }

    this.getSize = function() {
        return this.size;
    }

    this.getPrice = function() {
        return this.size.price +
            this.type.price +
            this.extraIngredients.map(ingredient => ingredient.price)
            .reduce((x, y) => x + y);
    };

    this.getPizzaInfo = function() {
        return `Size: ${this.size.name}, type: ${this.type.name}; extra ingredients: ${this.extraIngredients
            .map(ingredient => ingredient.name)}; price: ${this.getPrice()}UAH.`
    };

}

/* Sizes, types and extra ingredients */
Pizza.SIZE_S = { name: 'SMALL', price: 50 };
Pizza.SIZE_M = { name: 'MEDIUM', price: 75 };
Pizza.SIZE_L = { name: 'LARGE', price: 100 };

Pizza.TYPE_VEGGIE = { name: 'VEGGIE', price: 50 };
Pizza.TYPE_MARGHERITA = { name: 'MARGHERITA', price: 60 };
Pizza.TYPE_PEPPERONI = { name: 'PEPPERONI', price: 70 }

Pizza.EXTRA_TOMATOES = { name: 'TOMATOES', price: 5 };
Pizza.EXTRA_CHEESE = { name: 'CHEESE', price: 7 };
Pizza.EXTRA_MEAT = { name: 'MEAT', price: 9 };

/* Allowed properties */
Pizza.allowedSizes = [
    Pizza.SIZE_S,
    Pizza.SIZE_M,
    Pizza.SIZE_L
];
Pizza.allowedTypes = [
    Pizza.TYPE_VEGGIE,
    Pizza.TYPE_MARGHERITA,
    Pizza.TYPE_PEPPERONI
];
Pizza.allowedExtraIngredients = [
    Pizza.EXTRA_TOMATOES,
    Pizza.EXTRA_CHEESE,
    Pizza.EXTRA_MEAT
];

/**
 * Provides information about an error while working with a pizza.
 * details are stored in the log property.
 * @constructor
 */
function PizzaException(log) {
    this.log = log;
}

// /* It should work */
// // // small pizza, type: veggie
// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// // // add extra meat
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
// // // check price
// console.log(`Price: ${pizza.getPrice()} UAH`); //=> Price: 109 UAH
// // add extra corn
// pizza.addExtraIngredient(Pizza.EXTRA_CHEESE);
// // // add extra corn
// pizza.addExtraIngredient(Pizza.EXTRA_TOMATOES);
// // // check price
// console.log(`Price with extra ingredients: ${pizza.getPrice()} UAH`); // Price: 121 UAH
// // // check pizza size
// console.log(`Is pizza large: ${pizza.getSize() === Pizza.SIZE_L}`); //=> Is pizza large: false
// // // remove extra ingredient
// pizza.removeExtraIngredient(Pizza.EXTRA_CHEESE);
// console.log(`Extra ingredients: ${pizza.getExtraIngredients().length}`); //=> Extra ingredients: 2
// console.log(pizza.getPizzaInfo()); //=> Size: SMALL, type: VEGGIE; extra ingredients: MEAT,TOMATOES; price: 114UAH.

// // examples of errors
// let pizza = new Pizza(Pizza.SIZE_S); // => Required two arguments, given: 1

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.SIZE_S); // => Invalid type
// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT); // => Duplicate ingredient

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// pizza.addExtraIngredient(Pizza.EXTRA_CORN); // => Invalid ingredient