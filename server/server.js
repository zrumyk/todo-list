require('dotenv').config();

const express = require('express')
const app = express()

const hostname = '127.0.0.1'
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.status(200)
    res.setHeader('Content-Type', 'text/plain')
    res.send('Hello world!')
})

app.listen(port, hostname, () => {
    console.log(`Server is running on port http://${hostname}:${port}`)
})