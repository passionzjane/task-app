const express = require('express')
require('./db/mongoose')
const { findById } = require('./models/userModel')
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')


const app = express()
const port = process.env.PORT || 3000


// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {  
//         next()
//     }
// })


// app.use((req, res, next) => {
//     if (req.method === 'GET' || req.method === 'POST' || req.method === 'PATCH'){  
//     res.status(503).send('Site is currently under maitanance')
//     } else {
//         next()
//     }
// })
 
app.use(express.json())
// Register routes
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log(`server is up on port ${port}` )
})