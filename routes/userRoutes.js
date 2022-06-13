const router = require('express').Router();
const User = require('../models/User')
const validator = require('email-validator')

//Login user
router.route('/login').post(async(req, res)=>{
    const {email, password} = req.body;

    if(!password || !email)
    {
        res.status(400).json({error:'All fields are required'});
        return;
    } 
    
    if(!validator.validate(email))
    {
        res.status(400).json({message:'It is not an valid email format'})
        return
    }

    try{        
        const user = await User.findOne({email:email, password:password})
        if(user == null)
        {
            res.status(404).json({message:"User not found! Email or password are incorrect!"})
            return
        }

        res.status(200).json(user);

    }catch(error){
        res.status(500).json({error:error})
    }
})

//Register User
router.route('/register').post(async(req, res)=>{
    const {name, email, password} = req.body;

    if(!name || !password || !email)
    {
        res.status(400).json({error:'All fields are required'});
        return;
    }
    if(!validator.validate(email))
    {
        res.status(400).json({message:'It is not an valid email format'})
        return
    }

    const user = {
        name, email, password
    }

    try{
        await User.create(user);
        res.status(201).json({message:"User created successfully"});
    }catch(error){
        res.status(500).json({error:error})
    }
})

//UPDATE name
router.route('/updateName').patch( async(req, res)=>{

    const {email, name} = req.body;

    const user = {
        name
    }

    try{
        const updatedUser = await User.updateOne({email:email},user);
        if(updatedUser.matchedCount === 0)
        {
            res.status(404).json({message:"User not found"});
            return;
        }
        res.status(200).json(user);
    }catch(error)
    {
        res.status(500).json({error:error});
    }
})


//UPDATE money
router.route('/updateMoney').patch( async(req, res)=>{

    const {email, money} = req.body;

    const user = {
        money
    }
   

    //Before closing the deal we need to verify if the money send from the user is the right amount
    //For this we need to compare the amount send from the user to the amount on the DB.
    //Then we make the difference and aprove the transaction
    try{
        const dbMoney = await User.findOne({email:email})
        if(!dbMoney)
        {
            res.status(404).json({message:"User not found"})
            return
        }
        if(dbMoney.money !== user.money)// || dbMoney.rentTime !== user.rentTime){
        {  
            res.status(403).json({message:"Information send from user does not match with DB information!"})
            return
        }     
        
        user.money = 0 //If all goes good the user has buyed the billboard and its money is zero
    }
    catch(error)
    {
       res.status(500).json({error:error})
    }
    try{
        const updatedMoney = await User.updateOne({email:email},user);
        if(updatedMoney.matchedCount === 0)
        {
            res.status(404).json({message:"User not found"});
            return;
        }
        res.status(200).json({message:"Congratulations, billboard was successfully rented!"});
    }catch(error)
    {
        res.status(500).json({error:error});        
    }
})

// //GET all users
// router.route('/').get( async(req,res)=>{
//     try{
//         const users = await User.find()
//         res.status(200).json(users);
//     }catch(error)
//     {
//         res.status(500).json({error:error});

//     }
// });


// //DELETE
// router.delete('/:id',async(req,res)=>{
//     const id = req.params.id;
//     const user = await User.findOne({_id:id});
//     if(!user)
//     {
//         res.status(422).json({message:'User not found'});
//         return;
//     }

//     try{
//         await User.deleteOne({_id:id});

//         res.status(200).json({message:"User was deleted successfully!"});
//     }catch(error)
//     {
//         res.status(500).json({error:error}); 
//     }
// })
module.exports = router;