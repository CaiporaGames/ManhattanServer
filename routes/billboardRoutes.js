const router = require("express").Router();
const Billboards = require('../models/Billboards')
const BillboardUsers = require('../models/BillboardUsers')
const User = require('../models/User')

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
    const {userID, URL, contentType, position, price, size, rentTime, availableAt, buyedAt} = req.body;

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

//This CREATE the billboard availableAt variable and the array of all the users that buyed the billboard.
router.route('/billboardUploadUsers').post(async(req, res)=>{
    const {position, availableAt, users, email} = req.body

    const billboardUser = 
    {
        position, 
        availableAt, 
        users
    }
   
    try
    {
        const user = await User.findOne({email:"m@g.com"})

        if(!user)
        {
            res.status(404).json({message:"User not found!"})
        }
        //Here must be the same amount of the billboard value. But for now bigger than 0
        if(user.money > 0)
        {
            try
            {
                const money = "0"
                user = await User.updateOne({email:"m@g.com"}, {$set:{money}})
                billboardUser = await BillboardUsers.create(billboardUser)                
                res.status(200).json(billboardUser);
            }
            catch(error)
            {
                if(error.code === 11000)
                {
                    //update the billboard availableAt variable                   
                    await BillboardUsers.updateOne({position}, {$set: { availableAt }, $addToSet: { users }});
                   
                    res.status(200).json(billboardUser);        
                }
                else
                {
                    res.status(500).json({error:error})
                }
            }
        }
    }
    catch(error)
    {
        res.status(500).json({error:error})
    }   
})


//This UPDATE the billboard availableAt variable and the array of all the users that buyed the billboard.
router.route('/billboardUpdateUsers').put(async(req, res)=>{
    const {position, availableAt, users} = req.body

    const billboardUser = 
    {
        availableAt, 
        users
    }

    try
    {
        billboardUser = await BillboardUsers.updateOne({position:position},billboardUser)
       
        res.status(200).json(billboardUser);
    }
    catch(error)
    {
        res.status(500).json({error:error})
    }
})

module.exports = router;