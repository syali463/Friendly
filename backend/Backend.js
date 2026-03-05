import 'dotenv/config';
import postgresRepo from './config/postgresRepo.js';
import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.js';
import subscriptionRoute from './routes/addSub.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) =>{
    req.db = postgresRepo;
    next();
})

app.get('/test', (req, res) => {
    res.send("Backend is working!");
});

app.use('/api', authRoute);

app.use('/api/dashboard', subscriptionRoute)

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));