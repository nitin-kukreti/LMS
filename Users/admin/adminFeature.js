const {  student: Student, teacher: Teacher } = require("../UserModel");



const createTeacher = (req, res) => {

    res.send("request is comming");

    console.log(req.body);

    try {

    } catch (err) {

    }
}

const createStudent=(req, res) => {

    res.send("request is comming");

    console.log(req.body);

    try {

    } catch (err) {

    }
}


const deleteStudent=(req,res)=>{
    res.send("request is comming");

    console.log(req.body);

    try {

    } catch (err) {

    }
 
}


const deleteTeacher=(req,res)=>{
    res.send("request is comming");

    console.log(req.body);

    try {

    } catch (err) {

    }
}


const updateTeacher=(req,res)=>{
    res.send("request is comming");

    console.log(req.body);

    try {

    } catch (err) {

    }
}

const updateStudent=(req,res)=>{
    res.send("request is comming");

    console.log(req.body);

    try {

    } catch (err) {

    }
}


module.exports = {
    createStudent,createTeacher,updateStudent,updateTeacher
}

