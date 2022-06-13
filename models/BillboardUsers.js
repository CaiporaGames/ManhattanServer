const mongoose = require('mongoose')
const {Schema} = mongoose

const usersShema = new Schema(
    {
        userID:
        {
            type:String,
            required:true
        },
        URL:
        {
            type:String,
            required:true
        },
        rentTime:
        {
            type:String,
            required:true

        },
        buyedAt:
        {
            type:String,
            required:true
        }
    }
)

const billboardUsersSchema = new Schema(
    {
        //This is the billboard ID, the position
        position:{
            type: String,
            required:true,
            unique:true
        },
        availableAt: {
            type: String,
            required:true
        },
        users:[usersShema]
    }
)

const BillboardUsers = mongoose.model('BillboardUsers', billboardUsersSchema);

module.exports = BillboardUsers