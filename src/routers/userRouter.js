const express = require('express')
const router = new express.Router()
const User = require('../models/userModel')
const auth = require('../middlewares/authMiddleware')


router.post('/users', async(req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
         res.status(400).send(e)
    }
})  


router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password )
        console.log(user)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})


router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})


router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/users/me', auth ,async(req, res) => {
    res.send(req.user)
})


router.patch('/users/me', auth, async(req, res) => {
    // To return array of strings instead of an object
    const updates = Object.keys(req.body)
    const allowUpdates = ['name', 'email', 'password', 'age']
    // prevent the app from crashing when an invalid agument is updated
    const isValidOperation = updates.every((update) => allowUpdates.includes(update))
    //Error handler if invalid is updated
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save({validateBeforeSave: false})
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/users/me', auth, async(req, res) => {
    try {
       await req.user.remove()
        res.send(req.user) 
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router