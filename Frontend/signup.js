
document.getElementById('signupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const userVal = document.getElementById('signupUsername').value;
        const emailVal = document.getElementById('signupEmail').value;
        const passVal = document.getElementById('signupPassword').value;
        const errorMsg = document.getElementById('existingUser');

        const response = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: userVal, email: emailVal, password: passVal})
        });

        const result = await response.json();
        if (response.ok) {
            window.alert("User Successfully created!");
            window.location.reload();
        } else {
            console.log(result.message);
            errorMsg.textContent = "Username or Email already exists";
        }
    });