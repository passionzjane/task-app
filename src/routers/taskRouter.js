const express = require('express')
const router = new express.Router()
const Task = require('../models/taskModel')
const auth = require('../middlewares/authMiddleware')
const User = require('../models/userModel')


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


// GET /task?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async(req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }


    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    
    try {

        let limit = 10

        if(req.query.limit) {
            limit = parseInt(req.query.limit)
        }
     
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit,
                skip: req.query.skip,
                sort
            }
        })

        res.send(req.user.tasks)
    } catch (e) {
        console.log(e)
       res.status(500).send(e) 
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