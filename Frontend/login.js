document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const passVal = document.getElementById('password').value;
        const errorMsg = document.getElementById('message');

        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  username, password: passVal })
        });
        const result = await response.json();

        if (result.success) {
            console.log(result.token);
            localStorage.setItem('token',result.token);
            localStorage.setItem('user', result.user);
            localStorage.setItem('id', result.id)
            window.location.href = 'dashboard.html';
        } else {
            errorMsg.textContent = "Invalid username or password.";
        }
    });
