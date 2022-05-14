require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000;
DBUSER = process.env.DBUSER;
DBPASSWORD = process.env.DBPASSWORD;

app.use(express.urlencoded({extended:true}))
app.use(express.json())



//API Routes
const userRoutes = require('./routes/userRoutes')
app.use('/user',userRoutes)


const imageRoutes = require('./routes/imageRoutes')
app.use('/image',imageRoutes)

const videoRoutes = require('./routes/videoRoutes')
app.use('/video',videoRoutes)


//DB Connection
mongoose.connect(`mongodb+srv://${DBUSER}:${DBPASSWORD}@cluster0.diujz.mongodb.net/ProjectManhattan?retryWrites=true&w=majority`)
.then(()=>{
    console.log("Connected to the MongoDB");
    app.listen(PORT, ()=>{
        console.log("Listening on port: "+PORT);
    });
})
.catch(error =>{
    console.log("DB connection error: "+error)
})

