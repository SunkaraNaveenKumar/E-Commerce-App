const mongoose = require('mongoose')
const Schema = mongoose.Schema

const supplierSchema = new Schema({
    username:{
        type:String,
        required:[true,'title is mandatory']
    },
    password:{
        type:String,
        required:[true,'password is mandatory']
    },
    isAdmin: {
        type: Boolean,
        default: true,
    }

},{ timestamps: true })

const Supplier = mongoose.model.Supplier || mongoose.model('Supplier', supplierSchema)

module.exports = Supplier