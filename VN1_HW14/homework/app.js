const appRoot = document.getElementById('app-root');
const h1 = document.createElement('h1');
h1.innerHTML = 'Countries Search';
appRoot.append(h1);
const rowProperties = ['name', 'capital', 'region', 'languages', 'area', 'flagURL'];
const headings = ['Country name', 'Capital', 'World Region', 'Languages', 'Area', 'Flag'];
const sortHeadings = ['Country name', 'Area'];
const arrowTypes = ['&#8597;', '&#8593;', '&#8595;'];
const arrows0 = createArrows(arrowTypes);
const arrows1 = createArrows(arrowTypes);
const arrows2 = createArrows(arrowTypes);
const NAME = 0;
const AREA = 4;
const ARROW_UP = 1;
const ARROW_DOWN = 2;

function createArrows(arrowTypes) {
    let arrows = [];
    for (let i = 0; i < arrowTypes.length; i++) {
        let arrow = document.createElement('span');
        arrow.className = 'arrow';
        arrow.innerHTML = arrowTypes[i];
        arrows.push(arrow);
    }
    return arrows;
}

const POSITIVE = 1;
const NEGATIVE = -1;

// Functions
function createRadio(value, text, container) {

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'selectType';
    radio.className = 'radio';
    radio.value = value;

    const label = document.createElement('label');
    radio.addEventListener('change', getRadioValue);
    label.setAttribute('for', radio.name);
    label.innerHTML = text;
    container.append(radio, label);
}

function getRadioValue(event) {
    if (event.target.value === 'regions') {
        selectLanguage.style.display = 'none';
        selectRegion.style.display = 'block';
    } else if (event.target.value === 'languages') {
        selectRegion.style.display = 'none';
        selectLanguage.style.display = 'block';
    }
    return event.target.value;
}


function createSelect(array, container) {
    const select = document.createElement('select');
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Select value';
    select.append(defaultOption);
    addSelectOption(array, select);
    container.append(select);
    return select;
}

function addSelectOption(array, selectContainer) {
    for (let i = 0; i < array.length; i++) {
        const option = document.createElement('option');
        option.value = array[i];
        option.text = array[i];
        selectContainer.append(option);
    }
}

function getSelectValue(event) {
    let tables = document.querySelectorAll('#table');
    for (let i = 0; i < tables.length; i++) {
        tables[i].remove();
    }
    let query = event.target.value;
    const countriesByRegion = externalService.getCountryListByRegion(query);
    const countriesByLanguage = externalService.getCountryListByLanguage(query);
    if (regions.includes(query)) {
        const table = createTable(rowProperties, countriesByRegion, headings);
        appRoot.append(table);
    } else if (languages.includes(query)) {
        const table = createTable(rowProperties, countriesByLanguage, headings);
        appRoot.append(table);
    }

}

function createTable(rowProperties, rowContent, columnContent) {

    const table = document.createElement('table');
    table.id = 'table'
    table.className = 'table';
    createHeader(table, headings, sortHeadings);

    function createHeader(table, headings) {
        const header = table.createTHead();
        header.id = 'thead';
        const headerRow = document.createElement('tr');
        header.append(headerRow);
        addHeaderContent(header, headerRow, headings);

        function addHeaderContent(header, headerRow, headings) {
            for (let i = 0; i < headings.length; i++) {
                let headerCell = document.createElement('th');
                headerCell.className = 'th';
                headerRow.append(headerCell);
                header.rows[0].cells[i].innerHTML = headings[i];
            }
        }
        addSortingArrow(header);

        function addSortingArrow(header) {

            let arrowCell1 = header.rows[0].cells[0];
            let arrowCell2 = header.rows[0].cells[AREA];

            let arrow1 = arrows1[0];
            let arrowType = arrows1.indexOf(arrow1);
            let arrow2 = arrows2[0];
            arrowCell1.append(arrow1);
            arrowCell2.append(arrow2);
            arrow1.addEventListener('click', sorting);
            arrow2.addEventListener('click', sorting);

            function sorting(event) {
                arrowType++;
                let arrow = event.target;
                let body = document.getElementById('tbody');
                arrow.innerHTML = arrows0[arrowType].innerHTML;
                if (arrowType === arrows0.length - 1) {
                    arrowType = NEGATIVE;
                }
                let needSwap = true;
                while (needSwap) {
                    needSwap = false;
                    for (let i = 0; i < body.rows.length - 1; i++) {
                        let row1 = body.rows[i];
                        let row2 = body.rows[i + 1];
                        let cell1;
                        let cell2;
                        let cell1Content;
                        let cell2Content;
                        if (arrow === arrow1) {
                            cell1 = body.rows[i].cells[0];
                            cell2 = body.rows[i + 1].cells[0];
                            cell1Content = cell1.innerHTML.toUpperCase();
                            cell2Content = cell2.innerHTML.toUpperCase();
                        } else if (arrow === arrow2) {
                            cell1 = body.rows[i].cells[AREA];
                            cell2 = body.rows[i + 1].cells[AREA];
                            cell1Content = Number(cell1.innerHTML);
                            cell2Content = Number(cell2.innerHTML);
                        }
                        if (arrow.innerHTML === arrows1[ARROW_UP].innerHTML) {

                            if (cell1Content > cell2Content) {
                                needSwap = true;
                                body.insertBefore(row2, row1);
                            }
                        } else if (arrow.innerHTML === arrows1[ARROW_DOWN].innerHTML) {
                            if (cell1Content < cell2Content) {
                                needSwap = true;
                                body.insertBefore(row2, row1);
                            }
                        }
                    }
                }
            }

        }
        return header;
    }
    const body = createBody(table, rowContent, columnContent, rowProperties);

    addCellContentFromProperties(rowContent, rowProperties, body);

    function createBody(table, rowContent, columnContent) {
        const body = table.createTBody();
        body.id = 'tbody';
        for (let i = 0; i < rowContent.length; i++) {
            let row = document.createElement('tr');
            row.className = 'row';
            body.append(row);
            for (let j = 0; j < columnContent.length; j++) {
                let cell = document.createElement('td');
                cell.className = 'cell';
                body.rows[i].append(cell);
            }
        }
        return body;
    }

    function addCellContentFromProperties(rowContent, rowProperties, container) {
        for (let i = 0; i < rowContent.length; i++) {
            for (let k = 0; k < rowProperties.length; k++) {
                if (typeof rowContent[i][rowProperties[k]] === 'object') {
                    container.rows[i].cells[k].innerHTML = Object.values(rowContent[i][rowProperties[k]]);
                } else if (rowProperties[k] === 'flagURL') {
                    let img = document.createElement('img');
                    img.src = rowContent[i][rowProperties[k]];
                    container.rows[i].cells[k].append(img);
                } else {
                    container.rows[i].cells[k].innerHTML = rowContent[i][rowProperties[k]];
                }
            }
        }
    }
    return table;
}
const radioDescription = document.createElement('p');
radioDescription.innerHTML = 'Please choose type of search: ';

const radios = document.createElement('div');
createRadio('regions', 'By Region', radios);
createRadio('languages', 'By Language', radios);
appRoot.append(radioDescription, radios);

const regions = externalService.getRegionsList();
const languages = externalService.getLanguagesList();

const selectDescription = document.createElement('p');
selectDescription.innerHTML = 'Please choose search query: ';

appRoot.appendChild(selectDescription);
const selectRegion = createSelect(regions, appRoot);
selectRegion.style.display = 'none';
const selectLanguage = createSelect(languages, appRoot);
selectLanguage.style.display = 'none';

selectRegion.addEventListener('change', getSelectValue);
selectLanguage.addEventListener('change', getSelectValue);