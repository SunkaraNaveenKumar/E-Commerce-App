const express = require('express')                  // npm install express
const mongoose = require('mongoose')                // npm install mongoose
const app = express()
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authUserRoute = require("./routes/userAuth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const supplierRoute = require("./routes/supplier")
const authSupplierRoute = require("./routes/suppAuth")

dotenv.config()

// configuration - enable express to parse incoming json data
app.use(express.json())
const port = 3035

app.use("/api/userAuth", authUserRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/cart", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/supplier", supplierRoute)
app.use("/api/suppAuth", authSupplierRoute)

// establish connection to database
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('error connecting to db', err)
    })

    app.listen(port, () => {
        console.log('SERVER IS RUNNING ON PORT', port)
    })