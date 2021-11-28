require('../src/db/mongoose')
const User = require('../src/models/userModel')
const Task = require('../src/models/taskModel')
const { count } = require('../src/models/userModel')

// User.findByIdAndUpdate('619c64c04c3a8cc351f88ec9', { age: 3})
// .then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 3})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


// Task.findByIdAndDelete('619d10cd5a0db6423bd1ee23')
// .then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false})
// }).then((incompleteTasks) => {
//     console.log(incompleteTasks)
// }).catch((e) => {
//     console.log(e)
// })



const deleteTaskAndCount = async (id) => {
    const removeTask = await Task.findByIdAndDelete(id)
    const countTask = await Task.countDocuments({ completed: false})
    return countTask
}

deleteTaskAndCount('619c684a12ad128e10df2ed9').then((countTask) => {
    console.log(countTask)
}).catch((e) => {
    console.log(e)
}) 