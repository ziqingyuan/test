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

async function resetDemotable() {
    const response = await fetch("/initiate-demotable", {
        method: 'POST'
    });
    const responseData = await response.json();

    if (responseData.success) {
        const messageElement = document.getElementById('resetResult');
        messageElement.textContent = "demotable initiated successfully!";
        fetchTableData();
    } else {
        alert("Error initiating table!");
    }
}

async function fetchAndDisplayUsers() {
    const tableElement = document.getElementById('demoTable');
    const response = await fetch('/users');
    const users = await response.json();
    
    users.forEach(user => {
        const row = tableElement.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

window.onload = function() {
    checkDbConnection();
    document.getElementById("resetDemotable").addEventListener("click", resetDemotable)
    fetchTableData();
};

function fetchTableData() {
    fetchAndDisplayUsers();
}