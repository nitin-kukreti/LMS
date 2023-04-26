const mongoose = require('mongoose')
const { courseSchema } = require('../course/model')
const { assignmentSchema } = require('../Users/teacher/AssignmentModel')


const batchSchema = mongoose.Schema({
    batchName: String,
    decription: String,
    courses: [courseSchema],
    assignment: [assignmentSchema],
    teachers: [{ type: mongoose.Types.ObjectId, required: true, ref: 'teacher' }],
    student: [{ type: mongoose.Types.ObjectId, required: true, ref: 'student' }]

})

const batch = mongoose.model('batch', batchSchema)

module.exports = batch