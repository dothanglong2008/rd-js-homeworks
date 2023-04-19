const defaultAttempt = 3;
const defaultMax = 8;
const defaultPrice = 0;
const defaultCurrentPrice = 100;
const double = 2;
const half = 2;
let replay = game(defaultAttempt, defaultMax, defaultPrice, defaultCurrentPrice);

function roulette(attempt, max, price, initialPrice) {
    let confirmPrompt = confirm('Do you want to play a game?');
    if (confirmPrompt === false) {
        alert('You did not become a billionaire, but can.');
    } else {
        game(attempt, max, price, initialPrice);
    }
}

function game(initialAttempt, initialMax, initialPrice, initialCurrentPrice) {

    let max = initialMax;
    let randomNumber = Math.floor(Math.random(0, 1) * (max + 1));
    let price = initialPrice;
    let currentPrice = initialCurrentPrice;


    for (let attempt = initialAttempt - 1; attempt >= 0; attempt--) {

        let userNumber = Number(prompt('Choose a roulette pocket number from 0 to ' + max + '\r\n' +
            'Attempts left: ' + attempt + '\r\n' +
            'Total prize: ' + price + '$' + '\r\n' +
            'Possible prize on current attempt: ' + currentPrice + '$'));

        if (userNumber === '') {
            alert('Thank you for your participation. Your prize is: ' + price + '$');
            let playAgain = confirm('Do you want to play again?');
            if (!playAgain) {
                return;
            } else {
                replay;
                return;
            }
        }

        if (userNumber === randomNumber) {
            price += currentPrice;
            let winAndContinue = confirm('Congratulation, you won! Your prize is: ' +
                price + '$. Do you want to continue ?');

            if (!winAndContinue) {
                alert('Thank you for your participation. Your prize is: ' + price + '$');
                let playAgain = confirm('Do you want to play again?');

                if (!playAgain) {
                    return;
                } else {
                    replay;
                    return;
                }
            } else {
                replay;
                return;
            }
        }
        currentPrice /= half;
    }

    alert('Thank you for your participation. Your prize is: ' + price + '$');
    let playAgain = confirm('Do you want to play again?');
    if (!playAgain) {
        return;
    } else {
        replay;
        return;
    }
}

roulette(defaultAttempt, defaultMax, defaultPrice, defaultCurrentPrice);