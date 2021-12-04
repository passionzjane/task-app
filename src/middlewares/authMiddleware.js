const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const auth = async (req, res, next) => {
   try {
       // find users header
      const token = req.header('Authorization').replace('Bearer ', '')
      // Validating the header
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // Find associated user to the header 
      const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

      if (!user) {
          // Triggers the catch
          throw new Error()
      }

      req.token = token
      req.user = user
      next()
   } catch (e) {
       res.status(401).send({error: 'Please authenticate.'})
   } 
}

module.exports = auth 