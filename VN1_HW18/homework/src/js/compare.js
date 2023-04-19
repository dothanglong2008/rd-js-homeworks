export const compare = (option1, option2) => {
    if (option1 === 'paper' && option2 === 'rock' || option1 === 'rock' && option2 === 'scissors' || option1 === 'scissors' && option2 === 'paper') {
        return true;
    } if (option1 === option2) {
        return 0;
    } else {
        return false;
    }
}