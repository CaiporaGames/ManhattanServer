require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
DBUSER = process.env.DBUSER;
DBPASSWORD = process.env.DBPASSWORD;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    next();
})


//API Routes
const userRoutes = require('./routes/userRoutes');
app.use('/user',userRoutes);


const imageRoutes = require('./routes/imageRoutes');
app.use('/image', imageRoutes);

const videoRoutes = require('./routes/videoRoutes');
app.use('/video', videoRoutes);

const billboardRoutes = require('./routes/billboardRoutes');
app.use('/billboard', billboardRoutes)

//DB Connection
//mongoose.connect(`mongodb+srv://${DBUSER}:${DBPASSWORD}@cluster0.diujz.mongodb.net/ProjectManhattan?retryWrites=true&w=majority`)//Mine Link
mongoose.connect(`mongodb+srv://${DBUSER}:${DBPASSWORD}@cluster0.ybuiw.mongodb.net/ProjectManhattan?retryWrites=true&w=majority`)//Guilherme Link
.then(()=>{
    console.log("Connected to the MongoDB");
    app.listen(PORT, ()=>{
        console.log("Listening on port: "+PORT);
    });
})
.catch(error =>{
    console.log("DB connection error: "+error);
})

//DBUSER = timoteo
//DBPASSWORD = H!perk.9000