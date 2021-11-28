const express = require('express')
const router = new express.Router()
const Task = require('../models/taskModel')
const auth = require('../middlewares/authMiddleware')


router.post('/tasks', auth, async(req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
}) 


router.get('/tasks', auth, async(req,res) => {
    try {
       const tasks = await Task.find({ owner: req.user._id })
        res.status(200).send(tasks) 
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id
   
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
       if (!task) {
            return res.status(404).send()
        }
        res.send(task)  
    } catch (e) {
        res.status(500).send()
    }
    
})

router.patch('/tasks/:id', auth, async(req, res) => {
    // To return array of strings instead of an object
    const updates = Object.keys(req.body)
    const allowUpdates = ['description', 'completed']
    // prevent the app from crashing when an invalid agument is updated
    const isValidOperation = updates.every((update) => allowUpdates.includes(update))
    //Send error if invalid is updated
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id})

            if(!task){
                return res.status(404).send()
            }

            updates.forEach((update) => task[update] = req.body[update])
            await task.save({validateBeforeSave: false})

            res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
       res.status(500).send(e)
    }
})


module.exports = router