import express from 'express';
const router = express.Router();

router.post('/add', async(req, res) => {
    try{
        const { service_name, price, currency, billing_cycle} = req.body;
        const pgressObj = req.db;
        console.log(req);

        pgressObj.addSub()
    }
    catch(err){
        console.log(err);
    }
})

export default router