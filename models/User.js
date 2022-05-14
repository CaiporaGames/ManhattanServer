const mongoose = require('mongoose')

const User = mongoose.model('User',{
    name:String,
    password:Number
})

module.exports = User;