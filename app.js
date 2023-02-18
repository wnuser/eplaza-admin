const apiRouts = require('./routes/apiRouts')

const express = require('express')
const bodyParser = require('body-parser')

const User = require('./models/VendorSubscription')

const app = express()

const fileUpload = require('express-fileupload')

require('dotenv/config')
const api = process.env.API_URL

// parse application/x-www-form-urlencoded
// app.use(express.bodyParser({ limit: '50mb' }))
app.use(
    bodyParser.urlencoded({
        parameterLimit: 100000,
        extended: false,
        limit: '50mb',
    })
)

// parse application/json
app.use(bodyParser.json())

// User.sync({ force: true })
// User.sync({ alter: true })

app.use(express.json())
app.use(fileUpload())

try {
    app.use('/', apiRouts)
} catch (error) {
    res.status(400).json({ message: error.message })
}

app.get(`${api}/`, (req, res) => {
    res.send('Hello !')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('Server has started', api)
})
