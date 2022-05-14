const mongoose = require('mongoose')

const Videos = mongoose.model('Videos',{
    userID:String,
    name:String,
    URL:String
})

module.exports = Videos;