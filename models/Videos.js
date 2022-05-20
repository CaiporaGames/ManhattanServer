const mongoose = require('mongoose')
const {Schema} = mongoose;

const videoSchema = new Schema (
    {
        userID:String,
        name:String,
        URL:String
    }
)

const Videos = mongoose.model('Videos',videoSchema)

module.exports = Videos;