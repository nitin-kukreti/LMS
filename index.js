const express = require('express')

// creating express app

const app = express()


app.get('/', (req, res) => {
    res.send("welcome to our web site")
})



