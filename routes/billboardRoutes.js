const router = require("express").Router();
const Billboards = require('../models/Billboards')


//UPLOAD Billboard content
router.route('/uploadBillboards').post(async(req,res)=>{

    const {userID, URL, contentType, position, price, size, rentTime, availableAt, buyedAt} = req.body

    if(!position || !userID || !URL || !contentType || !price || !size || !availableAt || !buyedAt || !rentTime)
    {
        res.status(422).json({error:'All fields are required'})
        return;
    }

    const billboard = {
        userID, URL, contentType, position, price, size, rentTime, availableAt, buyedAt
    }

    try {
        await Billboards.create(billboard)       
        res.status(200).json({message:"Billboard successfully uploaded!"})
    }
    catch(error)
    {
        if(error.code === 11000){
            res.status(500).json({message:"This billboard already exists on the collection!"})
            return
        }
        res.status(500).json({error:error})
          }
})


//DOWNLOAD Billboard content
router.route('/downloadBillboards').post(async(req,res)=>{

    const {position} = req.body

    if(!position)
    {
        res.status(422).json({error:'Position field is required'});
        return;
    }  

    try {
        const billboard = await Billboards.findOne({position:position})
        
        if(!billboard){
            res.status(422).json({message:"There are no billboard with that coordinates"})
            return
        }
        res.status(200).json(billboard)
    }
    catch(error)
    {
        res.status(500).json({error:error})
    }
})


//UPDATE Billboard Content
router.patch('/updateBillboards', async(req, res)=>{
    const {userID, URL, contentType, position, rentTime, availableAt, buyedAt} = req.body;

    const billboard = {
        userID, URL, contentType,
        rentTime, availableAt, buyedAt
    }

    try{
        const updatedBillboard = await Billboards.updateOne({position:position}, billboard);
        if(updatedBillboard.matchedCount === 0)
        {
            res.status(500).json({message:"Billboard not found"});
            return;
        }
        res.status(200).json(billboard);
    }catch(error)
    {
        res.status(500).json({error:error});
        console.log(error)
    }
})


module.exports = router;