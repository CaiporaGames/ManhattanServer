const mongoose = require('mongoose')
const {Schema} = mongoose


const billboardSchema = new Schema(
    {
        userID:{
            type: String,
            required: true
        },
        URL:{
            type: String,
            required: true,
        },
        contentType:{
            type: String,
            required:true
        },
        position:{
            type: String,
            required:true,
            unique:true
        },
        price: {
            type: String,
            required: true,
        },
        size:{
            type: String
        },
        rentTime :{
            type:String,
            required:true
        },
        availableAt: {
            type: String,
            required: true,
        },
        buyedAt: {
            type: String,
            required: true,
        }
    }
)
const Billboards = mongoose.model('Billboard', billboardSchema)

module.exports = Billboards