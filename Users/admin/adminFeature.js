const { student: Student, teacher: Teacher } = require("../userModel");



const createTeacher = (req, res) => {

    res.send("request is comming");

    console.log(req.body);

    try {

    } catch (err) {

    }
}

const createStudent = (req, res) => {

    res.send("request is comming");

    console.log(req.body);

    try {

    } catch (err) {

    }
}


const deleteStudent = (req, res) => {
    res.send("request is comming");

    console.log(req.body);

    try {

    } catch (err) {

    }

}


const deleteTeacher = (req, res) => {
    res.send("request is comming");

    console.log(req.body);

    try {

    } catch (err) {

    }
}


const updateTeacher = (req, res) => {
    res.send("request is comming");

    console.log(req.body);

    try {

    } catch (err) {

    }
}

const updateStudent = (req, res) => {
    res.send("request is comming");

    console.log(req.body);

    try {

    } catch (err) {

    }
}

const createBatch = (req, res) => {
    res.send("request is comming");
}


module.exports = {
    createStudent, createTeacher, updateStudent, updateTeacher, createBatch
}

