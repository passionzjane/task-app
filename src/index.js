const express = require('express')
const databaseConnect = require('./db/mongoose')
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')


databaseConnect()

const app = express()
const port = process.env.PORT
 
app.use(express.json())
// Register routes
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log(`server is up on port ${port}` )
})