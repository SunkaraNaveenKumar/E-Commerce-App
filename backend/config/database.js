const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config()

// establish connection to database
const configureDB = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('error connecting to db', err)
    })
}

module.exports = configureDB

