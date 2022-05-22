const mongoose = require('mongoose')
const {Schema} = mongoose

const imageSchema = new Schema(
    {    
        userID:
        {
            type:String
        },
        name:
        {
            type:String,
            required:true
        },
        URL:
        {
            type:String,
            required:true,
            unique:true
        }
    }    
)
const Images = mongoose.model('Images', imageSchema)

module.exports = Images;