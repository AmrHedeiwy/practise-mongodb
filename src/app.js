const express = require('express')
const app = express()
require('./db/mongoose')
const userRouter = require('./router/users')

app.use(express.json())
app.use(userRouter)



module.exports = app