import express from 'express';
const router = express.Router();

router.post('/add', async(req, res) => {
    try{
        const pgressObj = req.db;
    }
    catch(err){
        console.log(err);
    }
})

export default router