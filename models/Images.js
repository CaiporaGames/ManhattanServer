const mongoose = require('mongoose')
const {Schema} = mongoose

const imageSchema = new Schema(
    {    
        userID:String,
        name:String,
        URL:String
    }    
)
const Images = mongoose.model('Images', imageSchema)

module.exports = Images;