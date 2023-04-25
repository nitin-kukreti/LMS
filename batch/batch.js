const mongoose=require('mongoose')
const { Course } = require('../course/model')
const { assignmentSchema } = require('../Users/teacher/AssignmentModel')


const batchSchema=mongoose.Schema({
    batchName:String,
    decription:String,
    courses:[Course],
    assignment:[assignmentSchema],
})

const batch=mongoose.model('batch',batchSchema)

module.exports=batch