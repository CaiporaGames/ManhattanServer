const mongoose = require('mongoose')
const {Schema} = mongoose


const newUsersShema = new Schema(
    {
        userID:
        {
            type:String,
        },
        URL:
        {
            type:String,
        },
        rentTime:
        {
            type:String,

        },
        buyedAt:
        {
            type:String,
        }
    }
)


const newBillboardSchema = new Schema(
    {
        userID:{
            type: String,
        },
        URL:{
            type: String,
        },
        contentType:{
            type: String,
        },
        position:{
            type: String,
            unique:true
        },
        price: {
            type: String,
        },
        size:{
            type: String
        },
        rentTime :{
            type: String,
        },
        availableAt: {
            type: String,
        },
        buyedAt: {
            type: String,
        },
        users:[newUsersShema]
    }
)
const NewBillboards = mongoose.model('NewBillboard', newBillboardSchema)

module.exports = NewBillboards