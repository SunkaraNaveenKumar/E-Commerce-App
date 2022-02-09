const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'TITLE IS REQUIRED']
    },
    price: {
        type: String,
        required: [true, 'PRICE IS REQUIRED']
    },
    supplierId : {
        type: Schema.Types.ObjectId,
        ref: 'Supplier'
    }
}, { timestamps: true })

// create a model
const Product = mongoose.model('Product', productSchema)

module.exports = Product