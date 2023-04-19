let playerScore = 0;
let computerScore = 0;
const choices = ['Rock', 'Paper', 'Scissors'];
let round = 1;
let isPlay = true;

const random = (array) => array[Math.floor(Math.random() * array.length)];

const setScore = () => {
    document.getElementById('player-score').innerHTML = playerScore;
    document.getElementById('computer-score').innerHTML = computerScore;
};

const setRound = () => {
    document.getElementById('round').innerHTML = round;
};

const setChoice = (playerChoice, computerChoice) => {
    document.getElementById('computer-choice').innerHTML = computerChoice;
    document.getElementById('player-choice').innerHTML = playerChoice;
};

const setRoundResult = (playerChoice, computerChoice, message) => {
    document.getElementById(
        'game-history',
    ).innerHTML += `<li>Round ${round}, ${playerChoice} vs. ${computerChoice}, ${message}</li>`;
}

const getResult = (playerChoice, computerChoice, options) => {
    if (computerChoice === options[0]) {
        setRoundResult(playerChoice, computerChoice, "You've WON!");
        playerScore++;
    }

    if (computerChoice === options[1]) {
        setRoundResult(playerChoice, computerChoice, "You've LOST!");
        computerScore++;
    }

    if (computerChoice === options[2]) {
        setRoundResult(playerChoice, computerChoice, "You've DRAW!");
    }

    round++;
    setRound();
    setScore();
    setChoice(playerChoice, computerChoice);
}

const play = (playerChoice) => {
    if (isPlay) {
        computerChoice = random(choices);

        if (playerChoice === 'Rock') {
            getResult(playerChoice, computerChoice, ['Scissors', 'Paper', 'Rock']);
        }

        if (playerChoice === 'Paper') {
            getResult(playerChoice, computerChoice, ['Rock', 'Scissors', 'Paper']);
        }

        if (playerChoice === 'Scissors') {
            getResult(playerChoice, computerChoice, ['Paper', 'Rock', 'Scissors']);
        }

        if (playerScore === 3 || computerScore === 3) {
            round = 3;
            setRound();
            if (playerScore > computerScore) {
                document.getElementById('game-result-notify').innerHTML = "You've WON!";
            } else if (playerScore < computerScore) {
                document.getElementById('game-result-notify').innerHTML = "You've LOST!";
            } else {
                document.getElementById('game-result-notify').innerHTML = "You've DRAW";
            }
            isPlay = false;
        }
    }
};

const reset = () => {
    playerScore = 0;
    computerScore = 0;
    isPlay = true;
    document.getElementById('game-result-notify').innerHTML = '';
    document.getElementById('game-history').innerHTML = '';

    setRound();
    setScore();
    setChoice('', '');
};

const buttons = document.getElementsByName('option');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerHTML;
        play(value);
    });
});

document.getElementById('reset').onclick = () => {
    reset();
};