/* START TASK 1: Your code goes here */
const root1 = document.getElementById('task1');
const BG_WHITE = 'rgb(255, 255, 255)';

const tableHTML = `<table class="table" onClick="tableClickHandler(event)">
<tbody>
    <tr>
        <td style="">Cell</td>
        <td>Cell</td>
        <td>Cell</td>
    </tr>
    <tr>
        <td>Cell</td>
        <td data-type="special">Special Cell</td>
        <td>Cell</td>
    </tr>
    <tr>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
    </tr>
</tbody>
</table>
`;

root1.innerHTML = tableHTML;

const tableClickHandler = (event) => {
    const el = event.target;
    const style = getComputedStyle(el);

    if (style.backgroundColor !== BG_WHITE) {
        return;
    }

    if (el.cellIndex === 0) {
        el.parentElement.classList.add('blue');
        return;
    }

    if (el.dataset.type === 'special') {
        el.closest('table').classList.add('green');
        return;
    }

    el.classList.add('yellow');
}


/* END TASK 1 */

/* START TASK 2: Your code goes here */

/* END TASK 2 */

/* START TASK 3: Your code goes here */

/* END TASK 3 */