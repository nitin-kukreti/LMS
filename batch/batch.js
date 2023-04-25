const mongoose = require('mongoose')
const { courseSchema } = require('../course/model')
const { assignmentSchema } = require('../Users/teacher/AssignmentModel')


const batchSchema = mongoose.Schema({
    batchName: String,
    decription: String,
    courses: [courseSchema],
    assignment: [assignmentSchema],
    teachers: [string],
    student: [string]

})

const batch = mongoose.model('batch', batchSchema)

module.exports = batch