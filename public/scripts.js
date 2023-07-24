async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');

    const response = await fetch('/check-db-connection');

    loadingGifElem.style.display = 'none';
    statusElem.style.display = 'inline';
    response.text()
    .then((text) => {
        statusElem.textContent = text;
    })
    .catch((error) => {
        statusElem.textContent = 'connection timed out';
    });
}

async function fetchAndDisplayUsers() {
    const table = document.getElementById('usersTable');
    const response = await fetch('/users');
    const users = await response.json();
    
    users.forEach(user => {
        const row = table.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

window.onload = function() {
    checkDbConnection();
    fetchAndDisplayUsers();
};
