
const apiRouts = require('./routes/apiRouts');

const express = require('express')
const bodyParser = require('body-parser')

const User  = require('./models/users')

const app = express()

const fileUpload = require('express-fileupload')

require('dotenv/config')
const api = process.env.API_URL

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// User.sync({ force: true })

app.use(express.json())
app.use(fileUpload())

app.use("/", apiRouts)
    
app.get(`${api}/`, (req, res) => {
    res.send('Hello !')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('Server has started', api)
})
