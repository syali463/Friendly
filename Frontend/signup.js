
document.getElementById('signupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const userVal = document.getElementById('signupEmail').value;
        const passVal = document.getElementById('signupPassword').value;
        const errorMsg = document.getElementById('existingUser');

        const response = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: userVal, password: passVal })
        });

        const result = await response.json();

        if (result.success) {
            window.alert("User Successfully created!");
        } else {
            errorMsg.textContent = "User already exists";
        }
    });