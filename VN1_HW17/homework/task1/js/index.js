const userUrl = 'https://jsonplaceholder.typicode.com/users';
const defaultProp = 'name';

// Main
const body = document.getElementsByTagName('body')[0];
body.innerHTML = pageTemplate();
displayList(userUrl, defaultProp);

// 1) get userlist GET /users
function getList(url) {
    displaySpinner();
    const response = fetch(url);
    return response.then(list => {
        hideSpinner();
        return list.json();
    });
}

// 2) Display them as list with possibility to edit. 
function pageTemplate() {
    return `
    <div id="root">
        <h1>Task 1</h1>
        <h2>GET /users</h2>
        <ul id="ul">
        </ul>
    </div>`;
}

function displayList(url) {
    const response = getList(url);
    const ul = document.getElementById('ul');
    response.then(list => list.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = 
        `${item.name} | 
        ${item.email} | 
        ${item.address.street} | 
        ${item.company.name} | 
        ${item.phone} | 
        ${item.website}`;
        ul.append(li);
    }));
}

// 3) When editing is finished update user on the server(call PUT method) 
// PUT/user/${id}
function editUser(url, id, data) {
    const userUrl = url + `/${id}`;
    displaySpinner();
    const response = fetch(userUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.then(item => {
        hideSpinner();
        return item.json();
    });
}

// 4) Add possibility to delete user DELETE /user/${id} 
function deleteUser(url, id) {
    const userUrl = url + `/${id}`;
    displaySpinner();
    const response = fetch(userUrl, {
        method: 'DELETE'
    });
    return response.then(item => {
        hideSpinner();
        return item.status;
    });
}

// 5) Show spinner on every request call
function displaySpinner() {
    const spinner = document.createElement('div');
    spinner.id = 'loader';
    body.append(spinner);
}

function hideSpinner() {
    const spinner = document.getElementById('loader');
    spinner.style.display = 'none';
}