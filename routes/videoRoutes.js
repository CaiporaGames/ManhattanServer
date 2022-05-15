const router = require('express').Router();
const Videos = require('../models/Videos')


//UPLOAD video
router.route('/uploadVideos').post(async(req, res)=>{
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

//DOWNLOAD videos
router.route('/downloadVideos').post( async(req,res)=>{
    const {userID} = req.body;

    try{
        const video = await Videos.find({userID:userID})
        if(!video)
        {
            res.status(422).json({message:"User do not has videos"});
            return;
        }
        console.log(video);
        res.status(200).json(video);
    }catch(error)
    {
        res.status(500).json({error:error});
    }
})


module.exports = router;