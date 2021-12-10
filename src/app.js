const express = require('express')
const databaseConnect = require('./db/mongoose')
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')


databaseConnect()

const app = express()

 
app.use(express.json())
// Register routes
app.use(userRouter)
app.use(taskRouter)


module.exports = app