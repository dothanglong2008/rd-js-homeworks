import { gameTemplate } from './gameTemplate';
import { compare } from './compare';

let round = 1;
let userScore = 0;
let machineScore = 0;
const play = (event) => {
    const options = document.getElementsByName('option');
    const choices = [];
    options.forEach(button => {
        choices.push(button.value);
    });
    const randomChoice = Math.floor(Math.random() * 3);
    const machineChoice = choices[randomChoice];
    const userChoice = event.target.value;
    const result = compare(userChoice, machineChoice);
    const results = document.getElementById('results');
    if (result) {
        results.innerHTML = `Round ${round}: ${userChoice} vs ${machineChoice}. You've WON!`;
        userScore++;
    } else if (result === 0) {
        results.innerHTML = `Round ${round}: ${userChoice} vs ${machineChoice}. You've DRAW!`;
    }
    else {
        results.innerHTML = `Round ${round}: ${userChoice} vs ${machineChoice}. You've LOST!`;
        machineScore++;
    }
    round++;
    if (userScore === 3 || machineScore === 3) {
        if (userScore === 3) {
            results.innerHTML = `You've WON!`;
            round = 1;
            userScore = 0;
            machineScore = 0;
        } else if (machineScore === 3) {
            results.innerHTML = `You've LOST!`;
            round = 1;
            userScore = 0;
            machineScore = 0;
        }
    }
    const resetAll = (round, userScore, machineScore) => {
        round = 1;
        userScore = 0;
        machineScore = 0;
        const results = document.getElementById('results');
        results.innerHTML = ``;
    }
    const reset = document.getElementById('reset');
    reset.addEventListener('click', resetAll);
}
const index = () => {
    const root = document.getElementById('root');
    root.innerHTML = gameTemplate();
    const options = document.getElementsByName('option');
    options.forEach(button => {
        button.addEventListener('click', play);
    });
}

index();