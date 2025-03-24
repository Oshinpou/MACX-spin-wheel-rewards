// Simulate local database using JSON file (users.json)
const usersDB = JSON.parse(localStorage.getItem('users')) || [];

function signUp() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    // Check if username exists
    const userExists = usersDB.some(user => user.username === username);
    if (userExists) {
        showError('Username already exists!');
        return;
    }

    // Add new user
    usersDB.push({ username, password, points: 0 });
    localStorage.setItem('users', JSON.stringify(usersDB));
    alert('Sign up successful! Please log in.');
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = usersDB.find(user => user.username === username && user.password === password);
    if (!user) {
        showError('Invalid username or password!');
        return;
    }

    // Save logged-in user info
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    alert('Login successful!');
    window.location.href = 'spinwheel.html';
}

function loadUsers() {
    const userList = document.getElementById('userList');
    let content = '<h3>Registered Users:</h3>';
    usersDB.forEach(user => {
        content += `<p>Username: ${user.username} | Points: ${user.points}</p>`;
    });
    userList.innerHTML = content;
}

function showError(message) {
    document.getElementById('error').innerText = message;
}
