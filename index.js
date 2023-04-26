const express = require('express')
const validAdmin = require('./Users/admin/middleware/validAdmin')
const { createTeacher, createStudent, createBatch, deleteStudent, deleteTeacher, updateStudent, updateTeacher, updateBatch, createAdmin } = require('./Users/admin/adminFeature')
const validAuth = require('./auth/validAuth')
const { uploadAssignment } = require('./Users/teacher/teacherFeature')
const { createCourse, createLecture } = require('./course/features')
const authenticate = require('./auth/auth')
const fileUpload = require('express-fileupload')
const bcrypt=require('bcrypt')



require('./db/config')

// creating express app

const app = express()


app.use(express.json())
app.use(fileUpload())
app.get('/', (req, res) => {
    res.send("welcome to our web site")
})

app.post('/signIn', authenticate);

app.post('/createAdmin', createAdmin);

app.post('/createTeacher', validAdmin, createTeacher);
app.post('/createStudent', validAdmin, createStudent);
app.post('/createBatch', validAdmin, createBatch);
app.delete('/deleteStudent', validAdmin, deleteStudent);
app.delete('/deleteTeacher', validAdmin, deleteTeacher);
app.patch('/updateStudent', validAdmin, updateStudent);
app.patch('/updateTeacher', validAdmin, updateTeacher);
app.patch('/updateBatch', validAdmin, updateBatch);

app.post('/createCourse', validAdmin, createCourse);
app.post('/createLecture/:courseId', validAdmin, createLecture);


app.post('/uploadAssignment', validAuth, uploadAssignment);

app.listen(3000);



