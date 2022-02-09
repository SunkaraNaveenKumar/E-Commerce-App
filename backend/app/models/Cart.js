const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'userId is required']
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'productId is required']
    }
}, { timestamps: true })

// create a model
const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart