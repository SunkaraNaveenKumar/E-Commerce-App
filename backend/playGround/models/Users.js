const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const usersSchema = new Schema({
    username : {
        type: String, 
        required:[true,'Every field is mandatory']
    },
    age : {
        type: Number
    },
    gender : {
        type: String
    },
    password : {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

const User = mongoose.model('Users',usersSchema)
module.exports = User