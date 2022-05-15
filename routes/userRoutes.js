const router = require('express').Router();
const User = require('../models/User')


//Login user
router.route('/login').post(async(req, res)=>{
    const {name, password} = req.body;

    if(!name || !password)
    {
        res.status(422).json({error:'All fields are required'});
        return;
    }   

    try{        
        const user = await User.findOne({name:name, password:password})

        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error:error})
    }
})

//Register User
router.route('/register').post(async(req, res)=>{
    const {name, password} = req.body;

    if(!name || !password)
    {
        res.status(422).json({error:'All fields are required'});
        return;
    }

    const user = {
        name, password
    }

    try{
        await User.create(user);
        res.status(201).json({message:"User create successfully"});
    }catch(error){
        res.status(500).json({error:error})
    }
})

// //GET all users
// router.get('/', async(req,res)=>{
//     try{
//         const users = await User.find()
//         res.status(200).json(users);
//     }catch(error)
//     {
//         res.status(500).json({error:error});

//     }
// });

// router.get('/:id', async(req,res)=>{
//     const id = req.params.id;

//     try{
//         const user = await User.findOne({_id:id})
//         if(!user)
//         {
//             res.status(422).json({message:"User not found"});
//             return;
//         }
//         res.status(200).json(user);
//     }catch(error)
//     {
//         res.status(500).json({error:error});
//     }
// })

// //UPDATE  (PUT, PATCH)
// router.patch('/:id', async(req, res)=>{
//     const id = req.params.id;
//     const {name, password} = req.body;

//     const user = {
//         name, password
//     }

//     try{
//         const updatedUser = await User.updateOne({_id:id},user);
//         if(updatedUser.matchedCount === 0)
//         {
//             res.status(500).json({message:"User not found"});
//             return;
//         }
//         res.status(200).json(user);
//     }catch(error)
//     {
//         res.status(500).json({error:error});
//     }
// })

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