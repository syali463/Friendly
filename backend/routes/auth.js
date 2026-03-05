import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const pgressObj = req.db;
        const user = await pgressObj.findUsername(username);

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (isMatch) {
            const jtoken = jwt.sign(
                { Client:user.username },
                process.env.SECRET_TOKEN,
                { expiresIn: '1h' });
            return res.json({ success: true, message: "Login successful!", user: user.username, token:jtoken });
        } else {
            return res.status(401).json({ success: false, message: "Wrong password" });
        }

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.post('/signup',async (req,res) => {
    const {username, email, password} = req.body;

    try {
        const pgressObj = req.db;
        const user = await pgressObj.findUsername(username);

        if(user){
            return res.status(401).json({ success: false, message: " User Already Exists, try different username or email"});
        }

        const hashPass = await bcrypt.hash(password,10);

        const newUser = await pgressObj.signUp(username, email, hashPass);

        return res.status(200).json({ success: true, message:"User has been created!"});
    }

    catch(err) {
        console.error(err);
        return res.status(500).json({ success : false, message: "Server Error"});
    }
})


export default router