const router = require('express').Router();
const Videos = require('../models/Videos')


//ADD video
router.post('/',async(req, res)=>{
    const {name, userID, URL} = req.body;

    if(!name || !userID || !URL)
    {
        res.status(422).json({error:'All fields are required'});
        return;
    }

    const video = {
        name, userID, URL
    }

    try{
        await Videos.create(video);
        res.status(201).json({message:'Video inserted successfully'});
    }catch(error){
        res.status(500).json({error:error})
    }
})

//GET video by userID.
router.get('/:userID', async(req,res)=>{
    const userID = req.params.userID;

    try{
        const video = await Videos.find({userID:userID})
        if(!video)
        {
            res.status(422).json({message:"User do not has videos"});
            return;
        }
        res.status(200).json(video);
    }catch(error)
    {
        res.status(500).json({error:error});
    }
})


module.exports = router;