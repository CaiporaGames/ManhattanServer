const mongoose = require('mongoose')
const {Schema} = mongoose;

const videoSchema = new Schema (
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
            unique:true,
            required:true
        }
    }
)

const Videos = mongoose.model('Videos',videoSchema)

module.exports = Videos;