const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: [true, 'CartID is required']
    },
    address: { 
        type : String 
    },
    paymentMode: { 
        type: String 
    },
    createdAt : { 
        type: Date,
        default: Date.now
    },
    paymentStatus : { 
        type: Boolean,
        default : true 
    }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

module.exports = Order