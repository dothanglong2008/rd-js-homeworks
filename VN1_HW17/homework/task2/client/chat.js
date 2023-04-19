const serverUrl = 'ws://localhost:8080';

chatSession();
function getAppTemplate() {
    const template =
        `<div id="container" class="container">
        <div id="chat-box" class="chat-box"></div>
        <div id="text-box" class="text-box">
            <form id="form" class="form">
                <input id="input" type="text" name="textBox" class="input">
                    <button id="button" class="button">Send</button>
            </form>
        </div>
    </div>`;
    return template;
}
function getBoxTemplate(name, message, time, className) {
    return `
    <div class="${className}">
        <p class="username">${name}</p>
        <p class="message">${message}</p>
        <p class="time">${time}</p>
    </div>`;
}

function chatSession() {
    let ws = new WebSocket(serverUrl);
    const username = prompt('Hi! What\'s your name?');

    const root = document.getElementById('root');
    root.innerHTML = getAppTemplate();
    const chatBox = document.getElementById('chat-box');
    const button = document.getElementById('button');

    // WebSocket Events Handlers
    ws.onmessage = (event) => {
        const dataPackage = JSON.parse(event.data);
        const { name, message } = dataPackage;

        const now = Date.now();
        const time = new Date(now).toLocaleTimeString();
        
        const boxPosition = 'left';
        const box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = getBoxTemplate(name, message, time, boxPosition);
        chatBox.append(box);
    }

    // Events
    button.addEventListener('click', (event) => {
        event.preventDefault();
        sendMessage(username, ws);
    });
}
function sendMessage(username, ws) {
    const content = document.getElementsByName('textBox')[0].value;

    // Display Sent Message
    const chatBox = document.getElementById('chat-box');
    displayMessage(username, content, chatBox);

    // Send Message
    const dataPackage = getDataPackage(username, content);
    send(ws, dataPackage);
}

function getDataPackage(username, content) {
    const data = {
        name: username,
        message: content
    }
    return JSON.stringify(data);
}

function send(ws, message) {
    ws.send(message);
}

function displayMessage(username, content, container) {
    const timestamp = Date.now();
    const time = new Date(timestamp).toLocaleTimeString();
    const boxPosition = 'right';
    const box = document.createElement('div');
    box.className = 'box';
    box.innerHTML = getBoxTemplate(username, content, time, boxPosition);
    container.append(box);
}

