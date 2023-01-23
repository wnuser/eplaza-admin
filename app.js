// const { add } = require('./add.js')
// const router = require('./test/t.js')

const userRouter = require('./users/user.router.js')

const express = require('express')
const app = express()
require('dotenv/config')
const api = process.env.API_URL

// const sum = add
// console.log(test)

// const userRouter = require('./users/user.router.js')

app.use(express.json())

app.use(`${api}/users`, userRouter)

app.get(`${api}/`, (req, res) => {
    res.send('Hello !')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('Server has started', api)
})
