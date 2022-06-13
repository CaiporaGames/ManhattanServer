const router = require("express").Router();
const NewBillboard = require('../models/NewBillboard')
const User = require('../models/User')

//Billboard Fist Upload
router.route('/firstBillboardUpload').post(async(req,res)=>{

    const {position} = req.body

    const billboard = {
        userID : "", URL:"", contentType:"", position, price:"", size:"", rentTime:"", availableAt:"", buyedAt : "", users : []
    }

    if(!position)
    {
        res.status(422).json({error:'Position Field is Required!'})
        return;
    }
    try {
        await NewBillboard.create(billboard)       
        res.status(200).json({message:"Billboard successfully created!"})
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

//Upload new users to the billboard
router.route('/billboardUpload').post(async(req,res)=>{

    const {userID, URL, contentType, position, price, size, rentTime, availableAt, buyedAt, users} = req.body
   
    const billboard = {
        userID , URL, contentType, position, price, size, rentTime, availableAt, buyedAt
    }

    const user = {
        users
    }

    if(!userID || !URL || !contentType || !position || !price || !size || !rentTime || !availableAt || !buyedAt)
    {
        res.status(422).json({error:'All fields are Required!'})
        return;
    }
    try {
        await NewBillboard.updateOne({position},{$set:{...billboard}, $addToSet: { users:user}})       
        res.status(200).json({message:"Billboard successfully updated!"})
    }
    catch(error)
    {        
        if(error.code === 11000){
            res.status(500).json({message:"This billboard already exists on the collection!"})
            return
        }
        res.status(500).json({error:error})
        console.log(error)
    }
})


//Upload new users to the billboard
router.route('/billboardDownload').post(async(req,res)=>{

    const {position} = req.body     

    if(!position)
    {
        res.status(422).json({error:'Position field is Required!'})
        return;
    }
    try {
        const billboard = await NewBillboard.findOne({position})       
        res.status(200).json(billboard)
    }
    catch(error)
    {         
        res.status(500).json({error:error})
    }
})

module.exports = router