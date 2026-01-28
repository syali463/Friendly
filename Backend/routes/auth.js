const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Your existing db connection

router.post('/', async (req, res) => {
    // 1. Get the data from the frontend
    const { username, password } = req.body;

    try {
        // 2. Find the user in the database
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);

        // 3. Handle "User Not Found"
        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        const user = result.rows[0];

        // 4. THE SIMPLE CHECK (Direct String Comparison)
        // If the database password matches the input password exactly
        if (user.password === password) {
            return res.json({ success: true, message: "Login successful!", user: user.username });
        } else {
            return res.status(401).json({ success: false, message: "Wrong password" });
        }

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;