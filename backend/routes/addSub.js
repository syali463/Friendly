import express from 'express';
const router = express.Router();

router.post('/add', async(req, res) => {
    const { service_name, price, currency, category, billing_cycle} = req.body;
    try{
        const pgressObj = req.db;
        const cleaned_servicename = service_name.toLowerCase().trim();
        const cleaned_price = price.trim();
        if(isNaN(cleaned_price)) { return res.status(400).json({success:false,message:"Enter valid price"}); }
        const subscription = await pgressObj.addSub(req.user.id, cleaned_servicename, Number(cleaned_price), category,currency, billing_cycle);
        return res.status(200).json({success:true, message:"Subscription added!"})
    }
    catch(err){
        //database error
        if(err.code === '23505'){
            return res.status(409).json({
                success: false, 
                message: `Looks like you already have a subscription for ${service_name} saved!` 
            });
        }
        //server error
        console.error("DATABASE ERROR IN /add ROUTE: ", err);
        return res.status(500).json({ 
            success: false, 
            message: "Something went wrong while saving your subscription. Please try again later." 
        });
    }
})

export default router