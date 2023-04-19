const appRoot = document.getElementById("app-root");

const REGION = "region";
const LANGUAGE = "language";
const defaultOption = `<option value="" selected disabled>Select value</option>`;
let selectedRadio = "";
let countries = [];

const SORT_VALUES = {
  COUNTRY: "name",
  AREA: "area",
};

const SORT_TYPES = {
  DEFAULT: {
    name: "default",
    value: "&#8597;",
  },
  ASCENDING: {
    name: "ascending",
    value: "&#8593;",
  },
  DESCENDING: {
    name: "descending",
    value: "&#8597;",
  },
};

const formHTML = `
    <h1 class="title">Countries Search</h1>
    <form action="#" class="form">
        <div class="form-row" onClick="clickRadioFunc(event)">
            <span class="group-label">Please choose the type of search:</span>
            <div class="form-group">
                <div class="field-group">
                    <input type="radio" name="type" id="region" value="region">
                    <label for="region">By Region</label>
                </div>
                <div class="field-group">
                    <input type="radio" name="type" id="language" value="language">
                    <label for="language">By Language</label>
                </div>
            </div>
        </div>
        <div class="form-row">
            <label class="group-label" for="query">Please choose search query:</label>
            <div class="form-group">
                <select name="query" id="select-query" disabled onchange="changeSelectFunc(value)">
                    ${defaultOption}
                </select>
            </div>
        </div>
    </form>
    <div id="tableRoot"></div>
`;

appRoot.innerHTML = formHTML;

const getSelectValues = (value) => {
  let options;
  if (value === REGION) {
    options = externalService.getRegionsList();
  } else if (value === LANGUAGE) {
    options = externalService.getLanguagesList();
  }

  const optionsHTML = options.map(
    (option) => `<option value="${option}">${option}</option>`
  );

  const selectElement = document.getElementById("select-query");
  selectElement.innerHTML = defaultOption + optionsHTML;
  selectElement.disabled = false;
};

const clickRadioFunc = (event) => {
  const value = event.target.value;
  if (value) {
    selectedRadio = value;
    getSelectValues(value);
  }
};

const changeSelectFunc = (value) => {
  if (selectedRadio === REGION) {
    countries = [...externalService.getCountryListByRegion(value)];
  } else if (selectedRadio === LANGUAGE) {
    countries = [...externalService.getCountryListByLanguage(value)];
  }

  renderTable(countries);
};

const renderTable = (countries) => {
  const tableHTML = `<table class="table">
            <thead>
                <tr onClick="sortTable(event)">
                    <th>Country name <span class="arrow" data-sort-name="${
                      SORT_VALUES.COUNTRY
                    }" data-sort-type="${SORT_TYPES.DEFAULT.name}">${
    SORT_TYPES.DEFAULT.value
  }</span>
                    </th>
                    <th>Capital</th>
                    <th>World region</th>
                    <th>Languages</th>
                    <th>Area <span class="arrow" data-sort-name="${
                      SORT_VALUES.AREA
                    }" data-sort-type="${SORT_TYPES.DEFAULT.name}">${
    SORT_TYPES.DEFAULT.value
  }</span></th>
                    <th>Flag</th>
                </tr>
            </thead>
            <tbody>
                ${countries.reduce(
                  (
                    acc,
                    { name, capital, region, area, languages, flagURL }
                  ) => {
                    return (
                      acc +
                      `<tr>
                            <td>${name}</td>
                            <td>${capital}</td>
                            <td>${region}</td>
                            <td>${Object.values(languages).join(", ")}</td>
                            <td>${area}</td>
                            <td><img src="${flagURL}" alt="${name}"></td>
                        </tr>`
                    );
                  },
                  ""
                )}
            </tbody>
        </table>`;

  const tableRoot = document.getElementById("tableRoot");
  tableRoot.innerHTML = tableHTML;
};

const sortArray = (arr, value, order) => {
  const ascendingCompare = (a, b) => (a[value] > b[value] ? 1 : -1);
  const descendingCompare = (a, b) => (a[value] < b[value] ? 1 : -1);
  if (order === SORT_TYPES.ASCENDING.name) {
    return arr.sort(ascendingCompare);
  }
  if (order === SORT_TYPES.DESCENDING.name) {
    return arr.sort(descendingCompare);
  }
};

const sortTable = (event) => {
  const el = event.target;
  if (el.className !== "arrow") return;
  renderTable(
    sortArray(countries, el.dataset.sortName, SORT_TYPES.ASCENDING.name)
  );
};

/*
write your code here

list of all regions
externalService.getRegionsList();
list of all languages
externalService.getLanguagesList();
get countries list by language
externalService.getCountryListByLanguage()
get countries list by region
externalService.getCountryListByRegion()
*/
