import 'dotenv/config';
import postgresRepo from './config/postgresRepo.js';
import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.js';
import subscriptionRoute from './routes/addSub.js';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
const app = express();
app.use(cors({
    origin: ['http://localhost:5500','http://127.0.0.1:5500'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    console.log("This is cookie:", req.cookies)
    if(!token){ return res.status(403).json({success : false, message : "not authorized"})}
    jwt.verify(token,process.env.SECRET_TOKEN, (err, decode) =>{
        if(err) { return res.sendStatus(403).json(header);}
        req.user = decode
        next();
    })

}
app.use((req,res, next) =>{
    req.db = postgresRepo;
    next();
})

app.get('/test', (req, res) => {
    res.send("Backend is working!");
});

app.use('/api', authRoute);

app.use(verifyToken);


app.use('/api/dashboard', subscriptionRoute)

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));