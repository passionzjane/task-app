const mongoose = require('mongoose')

// connect to database

const databaseConnect = async() => {
    try {
    connect = await mongoose.connect(process.env.MONGODB_URL, {})
    console.log(`DB connected @${connect.connection.host}`)
    } catch (e) {
    console.log(e.message)
}
}


module.exports = databaseConnect
