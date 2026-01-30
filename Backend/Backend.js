const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const loginRoute = require("./routes/auth")
app.use(cors());
app.use(express.json());


app.get('/test', (req, res) => {
    res.send("Backend is working!");
});

app.use('/api', loginRoute);

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));