const express = require('express');
const router = express.Router();
const db = require('../config/db'); 
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password,user.password);

        if (isMatch) {
            return res.json({ success: true, message: "Login successful!", user: user.username });
        } else {
            return res.status(401).json({ success: false, message: "Wrong password" });
        }

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.post('/signup',async (req,res) => {
    const {username , password} = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);

        if(result.rows.length > 0){
            return res.status(401).json({ success: false, message: " User Already Exists, try different username"});
        }

        const saltString = 10;
        const hashPass = await bcrypt.hash(password,saltString);

        const newUser = await db.query('INSERT INTO users (username,password) VALUES ($1,$2) RETURNING id, username',
        [username,hashPass]);

        return res.status(200).json({ success: true, message:"User has been created!"});
    }

    catch(err) {
        console.error(err);
        return res.status(500).json({ success : false, message: "Server Error"});
    }
})


module.exports = router;