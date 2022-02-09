const express = require("express")
const app = express()
const port = 3055
app.use(express.json())
const mongoose = require("mongoose")

//connection to DataBase
mongoose.connect('mongodb://localhost:27017/e-commerce')
        .then(()=>{
            console.log('connected to DB')
        })
        .catch((err)=>{
            console.log('error connecting to DB',err)
        })

// schema
const Schema = mongoose.Schema

//Users - Schema, Model, API's ---
const usersSchema = new Schema({
    name : {
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
        type: String
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
})

const Users = mongoose.model('users',usersSchema)

app.get('/', (req, res) => {
    res.send('WELCOME TO INFOVISION DUMMY  E-COMM WEBSITE')
})

// Get Users
app.get('/api/users',(req,res)=>{
    Users.find()
        .then((users)=>{
            res.json(users)
        })
        .catch((err)=>{
            res.json(err)
        })
})

// Create user
app.post('/api/users', (req,res)=>{
    const body= req.body
    const user = new Users(body)
    user.save()
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
})

// Get User by Id
app.get('/api/users/:id',(req,res)=>{
    const id = req.params.id
    Users.findById(id)
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
})

//Update user
app.put('/api/users/:id',(req,res)=>{
    const id = req.params.id
    const body = req.body
    Users.findByIdAndUpdate(id,body,{new: true, runValidators:true})
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
})

// Delete User
app.delete('/api/users/:id',(req,res)=>{
    const id =req.params.id 
    Users.findOneAndDelete(id)
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
})

//Supplier - Schema, Model, API's ---
const supplierSchema=new Schema({
    name:{
        type:String,
        required:[true,'title is mandatory']
    },
    password:{
        type:String,
        required:[true,'password is mandatory']
    }
})

const Supplier=mongoose.model('supplierLogin',supplierSchema)

app.get('/',(req,res)=>{
    res.send('welcome')
})

app.get('/api/suppliers',(req,res)=>{
    Supplier.find()
    .then((list)=>{
        res.json(list)
    })
    .catch((err)=>{
        res.json(err)
    })
})

app.post('/api/login',(req,res)=>{
    const body=req.body 
    const login= new Supplier(body) 
    login.save()
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.status(400).json(err)
    })
})

//Products - Schema, Model, API's ---
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'TITLE IS REQUIRED']
    },
    price: {
        type: Number,
        required: [true, 'PRICE IS REQUIRED']
    },
    supplierId : {
        type: String
    }
})

// create a model
const Product = mongoose.model('Product', productSchema)

// setup tasks api
app.get('/products', (req, res) => {
    Product.find()
        .then((p) => {
            res.json(p)
        })
        .catch((err) => {
            res.json(err)
        })
})

app.post('/products', (req, res) => {
    const body = req.body
    const product = new Product(body)
    product.save()
    .then((p) => {
        res.json(p)
    })
    .catch((err) => {
        res.json(err)
    })
})

app.get('/products/:id', (req, res) => {
    const id = req.params.id
    Product.findById(id)
    .then((p) => {
        res.json(p)
    })
    .catch((err) => {
        res.json(err)
    })
})

app.put('/products/:id', (req,res) => {
    const id = req.params.id
    const body = req.body
    Product.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then((p) => {
            res.json(p)
        })
        .catch((err) => {
            res.json(err)
        })
})

app.delete('/products/:id', (req, res) => {
    const id = req.params.id
    Product.findByIdAndDelete(id)
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
            res.json(err)
        })
})

//Cart - Schema, Model, API's ---
const cartSchema = new Schema({
    userId: {
        type: String,
        required: [true, 'userId is required']
    },
    productId: {
        type: String,
        required: [true, 'productId is required']
    }
})

// create a model
const Cart = mongoose.model('Cart', cartSchema)

// cart APIs

// get cart items
app.get('/api/cart', (req, res) => {
    Cart.find()
        .then((cartItems) => {
            res.json(cartItems)
        })
        .catch((err) => {
            res.json(err)
        })
})

// create cart Items
app.post('/api/cart', (req, res) => {
    const body = req.body
    const cartItem = new Cart(body)
    cartItem.save() // to insert to database
        .then((cartItem) => {
            res.json(cartItem)
        })
        .catch((err) => {
            res.json(err)
        })
})

// get cartItem by Id
app.get('/api/cart/:id', (req, res) => {
    const id = req.params.id
    Cart.findById(id)
        .then((cartItem) => {
            res.json(cartItem)
        })
        .catch((err) => {
            res.json(err)
        })
})

// update cartItem
app.put('/api/cart/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    Cart.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        .then((cartItem) => {
            res.json(cartItem)
        })
        .catch((err) => {
            res.json(err)
        })
})

// delete cartItem
app.delete('/api/cart/:id', (req, res) => {
    const id = req.params.id
    Cart.findByIdAndDelete(id)
        .then((cartItem) => {
            res.json(cartItem)
        })
        .catch((err) => {
            res.json(err)
        })
})

//Orders - Schema, Model, API's ---
const orderSchema = new Schema({
    cartID: { 
        type : String 
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
        type: Boolean 
    }
})

const Order = mongoose.model('Order', orderSchema)

app.get('/api/orders', (req, res) => {
    Order.find()
        .then((orders) => {
            res.json(orders)
        })
        .catch((err)=>{
            res.json(err)
        })
})

app.get('/api/orders/:id', (req, res) => {
    const id = req.params.id
    Order.findById(id)
        .then((orders) => {
            res.json(orders)
        })
        .catch((err)=>{
            res.json(err)
        })
})

app.post('/api/orders', (req, res) => {
    const body = req.body
    const order = new Order(body)
    order.save()
        .then((orders) => {
            res.json(orders)
        })
        .catch((err)=>{
            res.json(err)
        })
})

app.listen(port, () => {
    console.log('server running on port',port);
})