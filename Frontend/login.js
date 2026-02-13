document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const userVal = document.getElementById('username').value;
        const passVal = document.getElementById('password').value;
        const errorMsg = document.getElementById('message');

        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: userVal, password: passVal })
        });

        const result = await response.json();

        if (result.success) {
            window.location.href = '/frontend/dashboard.html';
        } else {
            errorMsg.textContent = "Invalid username or password.";
        }
    });
