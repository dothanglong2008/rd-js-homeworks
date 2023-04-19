function interestCalculator() {
    const initialAmount = Number(prompt('Initial amount: '));
    const years = Number(prompt('Number of years: '));
    const percentage = Number(prompt('Percentage of a year: '));
    const decimalPlaces = 2;
    const amountLimit = 1000;
    const rateLimit = 100;

    if (isNaN(initialAmount) || !Number.isInteger(years) || isNaN(percentage) ||
        initialAmount < amountLimit || years < 1 || percentage > rateLimit) {
        alert('Invalid input data');
    } else {

        const totalProfit = initialAmount * (Math.pow(1 + percentage/rateLimit, years) - 1);
        const totalAmount = totalProfit + initialAmount;

        const fixedProfit = totalProfit.toFixed(decimalPlaces);
        const fixedAmount = totalAmount.toFixed(decimalPlaces);

        alert('Initial amount: ' + initialAmount + '\r\n' +
            'Number of years: ' + years + '\r\n' +
            'Percentage of year: ' + percentage + '\r\n \r\n' +
            'Total profit: ' + fixedProfit + '\r\n' +
            'Total amount: ' + fixedAmount);
    }
}

interestCalculator();