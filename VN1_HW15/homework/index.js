/* START TASK 1: Your code goes here */
const root1 = document.getElementById('task1');
// Variables
const ROWS = 3;
const COLUMNS = 3;

// Functions
const createTable = function(numberOfRows, numberOfColumns, container) {
    const table = document.createElement('table');
    table.id = 'table'
    table.className = 'table';
    container.appendChild(table);
    for (let i = 0; i < numberOfRows; i++) {
        let row = document.createElement('tr');
        table.append(row);
        for (let j = 0; j < numberOfColumns; j++) {
            let cell = document.createElement('td');
            cell.className = 'cell';
            cell.innerHTML = 'Cell';
            table.rows[i].append(cell);
        }
    }
    return table;
}

// Main
let table = createTable(ROWS, COLUMNS, root1);
const FIRST_COLUMN = 0;
let specialCell = table.rows[1].cells[FIRST_COLUMN];
specialCell.innerHTML = 'Special Cell';
specialCell.addEventListener('click', setGreen);

let rows = table.rows;
let firstColumnCells = [];
for (let i = 0; i < rows.length; i++) {

    firstColumnCells.push(rows[i].cells[FIRST_COLUMN]);
    for (let j = 0; j < firstColumnCells.length; j++) {
        firstColumnCells[j].addEventListener('click', setBlue);
    }

    let cells = rows[i].cells;
    for (let j = 0; j < cells.length; j++) {
        if (cells[j].style.backgroundColor !== 'yellow') {
            cells[j].addEventListener('click', setYellow);
        }
    }
}

// Events
function removeChange(event) {
    let cells = event.target.parentNode.cells;
    for (let j = 0; j < cells.length; j++) {
        let cellBackground = cells[j].style.backgroundColor;
        if (cellBackground !== 'yellow') {
            cells[j].style.backgroundColor = '';
        }
    }
}

function setGreen(event) {
    let table = event.target.parentNode.parentNode;
    let rows = event.target.parentNode.parentNode.rows;
    table.style.backgroundColor = 'green';
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].cells;
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].style.backgroundColor === '') {
                cells[j].style.backgroundColor = 'green';
            }
        }
    }
}

function setBlue(event) {
    let cells = event.target.parentNode.cells;
    for (let j = 0; j < cells.length; j++) {
        let cellBackground = cells[j].style.backgroundColor;
        if (cellBackground === '') {
            cells[j].style.backgroundColor = 'blue';
        }
        if (cells[j].style.backgroundColor === 'yellow') {
            cells[j].addEventListener('click', removeChange);
        }
    }
}

function setYellow(event) {
    let cell = event.target;

    if (cell.style.backgroundColor === '') {
        cell.style.backgroundColor = 'yellow';
    }
}

/* END TASK 1 */

/* START TASK 2: Your code goes here */
// Create HTML Elements
const root2 = document.getElementById('task2');

const notification = document.createElement('div');
notification.className = 'noti';

const form = document.createElement('form');
form.className = 'form';

const input = document.createElement('input');
input.type = 'text';
input.className = 'input';

const button = document.createElement('input');
button.type = 'submit';
button.disabled = true;
button.value = 'Send';

form.append(notification, input, button);
root2.append(form);

// Events
input.addEventListener('input', validate);
button.addEventListener('click', submit);

// Events Handlers
function validate(event) {
    event.preventDefault();
    const valid = /\+380[0-9]{9}$/;
    if (!valid.test(event.target.value)) {
        button.disabled = true;
        notification.style.display = 'block';
        input.style.border = '2px solid red';
        notification.style.backgroundColor = '#FF8080';
        notification.innerHTML = 'Type number does not follow format \n +380***********';
    } else {
        input.style.border = '1px solid grey';
        button.disabled = false;
        notification.style.display = 'none';
    }
}

function submit(event) {
    event.preventDefault();
    notification.style.display = 'block';
    notification.style.backgroundColor = 'green';
    notification.style.border = '1px solid green';
    notification.innerHTML = 'Data was successfully sent';
}
/* END TASK 2 */

/* START TASK 3: Your code goes here */
const root3 = document.getElementById('task3');
const WIDTH = 40;
const HEIGHT = 40;
let teamAScore = 0;
let teamBScore = 0;

const courtContainer = document.createElement('div');
courtContainer.id = 'court-container';
courtContainer.className = 'court-container';

const court = document.createElement('img');
court.setAttribute('src', 'assets/court.png');
court.style.width = '600px';
court.style.height = '330px';

const ball = document.createElement('img');
ball.setAttribute('src', 'assets/ball.png');
ball.className = 'ball';
ball.style.width = WIDTH + 'px';
ball.style.height = HEIGHT + 'px';

const scoreBoard = document.createElement('div');
scoreBoard.className = 'score-board';
const teamA = document.createElement('div');
teamA.className = 'team-a';
teamA.innerHTML = 'Team A: ' + teamAScore;

const teamB = document.createElement('div');
teamB.className = 'team-b';
teamB.innerHTML = 'Team B: ' + teamBScore;

const notiBoard = document.createElement('h1');
notiBoard.className = 'noti-board';

root3.append(courtContainer);
courtContainer.append(court);
courtContainer.append(ball);

scoreBoard.append(teamA, teamB);
root3.append(scoreBoard);
root3.append(notiBoard);

// Events
court.addEventListener('click', setPosition, true);
const aScored = new CustomEvent('aScored', { detail: { score: teamAScore, team: 'A', color: 'blue' } });
const bScored = new CustomEvent('bScored', { detail: { score: teamBScore, team: 'B', color: 'red' } });

teamA.addEventListener('aScored', teamScored);
teamB.addEventListener('bScored', teamScored);

// Events Handlers
function setPosition(event) {
    event.stopPropagation();
    const HALF = 2;
    const hoopA = {
        left: 13,
        right: 27,
        up: 138,
        down: 152
    };
    const hoopB = {
        left: 533,
        right: 544,
        up: 138,
        down: 152
    }

    let x = event.offsetX - WIDTH / HALF;
    let y = event.offsetY - HEIGHT / HALF;
    ball.style.left = x + 'px';
    ball.style.top = y + 'px';
    if (x > hoopA.left && x < hoopA.right && y > hoopA.up && y < hoopA.down) {
        teamB.dispatchEvent(bScored);
    } else if (x > hoopB.left && x < hoopB.right && y > hoopB.up && y < hoopB.down) {
        teamA.dispatchEvent(aScored);
    }
}

function teamScored(event) {
    event.detail.score++;
    event.target.innerHTML = 'Team ' + event.detail.team + ': ' + event.detail.score;
    notiBoard.innerHTML = 'Team ' + event.detail.team + ' score!';
    notiBoard.style.color = event.detail.color;
}

/* END TASK 3 */