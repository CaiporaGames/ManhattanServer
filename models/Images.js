const mongoose = require('mongoose')

const Images = mongoose.model('Images',{
    userID:String,
    name:String,
    URL:String
})

module.exports = Images;