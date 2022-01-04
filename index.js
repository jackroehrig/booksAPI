// Dependencies
const express = require('express')

// Config
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
app.use(express.static("public"))
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send('hi im paul')
})

app.use('/books', require('./controllers/books'))

app.get('*', (req, res) => {
    res
        .status(404)
        .send("that page doesn't exist!")
})

// Listen
app.listen(PORT)