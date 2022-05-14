const router = require('express').Router();
const Images = require('../models/Images')


//ADD images
router.post('/',async(req, res)=>{
    const {name, userID, URL} = req.body;

    if(!name || !userID || !URL)
    {
        res.status(422).json({error:'All fields are required'});
        return;
    }

    const image = {
        name, userID, URL
    }

    try{
        await Images.create(image);
        res.status(201).json({message:'Image inserted successfully'});
    }catch(error){
        res.status(500).json({error:error})
    }
})

//GET image by userID.
router.get('/:userID', async(req,res)=>{
    const userID = req.params.userID;

    try{
        const image = await Images.find({userID:userID})
        if(!image)
        {
            res.status(422).json({message:"User do not has images"});
            return;
        }
        res.status(200).json(image);
    }catch(error)
    {
        res.status(500).json({error:error});
    }
})


module.exports = router;