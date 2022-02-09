const express = require('express')                   // npm install express
const app = express()
app.use(express.json())                              // MIDDLEWARE
const port = 3040

const customers = [
    { id: 1, name: 'Jason'},
    { id: 2, name: 'PlaceHolder'}
]

// Request Handler
// app.HTTPMethod(url, callback)

// read
app.get('/', (req, res) => {
    res.send('WELCOME TO MY WEBSITE')
})

app.get('/customer', (req, res) => {
    res.json(customers)

})

// create
app.post('/customer', (req, res) => {
    const body = req.body
    res.json(body)
})

app.get('/customer/:id', (req, res) => {
    const id = req.params.id
    const customer = customers.find(customer => customer.id == id)
    if(customer) {
        res.json(customer)
    } else {
        res.json({})
    }
})

// update
app.put('/customer/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    res.send(`PUT REQUEST SENT TO THE SERVER TO UPDATE ${id}`)
})

// delete
app.delete('/customer/:id', (req, res) => {
    const id = req.params.id
    res.send(`DELETE REQUEST SENT TO SERVER TO DELETE WITH RESPECT TO ID ${id}`)
})

app.listen(port, () => {
    console.log('server running on port', port)
})