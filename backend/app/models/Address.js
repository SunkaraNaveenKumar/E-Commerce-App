const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema=new Schema({ // address schema
    landmark:{
        type:String,
        required:[true,'landmark is mandatory']
    },
    city:{
        type:String,
        required:[true,'city is mandatory']
    },
    state:{
        type:String,
        required:[true,'state is mandatory']
    },
    pincode:{
        type:Number,
        required:[true,'pincode is mandatory']
    }
})

const Address = mongoose.model('Address', addressSchema)
module.exports = Address