const Batch = require("../../batch/batch");
const { student: Student, teacher: Teacher } = require("../userModel");



const createTeacher = async(req, res) => {

    res.send("request is comming");

    console.log(req.body);

    try {

        const teacher = new Teacher(req.body);
        await teacher.save();
        res.json(201, { msg: 'created ' })
    } catch (err) {
        res.status(500);
        res.json(500, { msg: "Internal Server Error Team is working on it" });
    }
}

const createStudent = async(req, res) => {

    res.send("request is comming");

    console.log(req.body);

    try {
        const student = new Student(req.body);
        await student.save();
        res.json(201, { msg: 'created ' })
    } catch (err) {
        res.status(500);
        res.json(500, { msg: "Internal Server Error Team is working on it" });
    }
}


const deleteStudent = async(req, res) => {
    res.send("request is comming");

    console.log(req.body);

    try {
        await Student.deleteOne(req.body);
        res.json(201, { msg: 'deleted' })
    } catch (err) {
        res.json(500, { msg: "Internal Server Error Team is working on it" });
    }

}


const deleteTeacher = async (req, res) => {
    res.send("request is comming");

    console.log(req.body);

    try {
        await Teacher.deleteOne(req.body);
        res.json(201, { msg: 'deleted' })
    } catch (err) {
        res.json(500, { msg: "Internal Server Error Team is working on it" });
    }
}


const updateTeacher = async(req, res) => {
    res.send("request is comming");

    console.log(req.body);

    try {
        await Teacher.updateOne({_id:req.body._id},req.body);
        res.json(201, { msg: 'modified' })
    } catch (err) {
        res.json(500, { msg: "Internal Server Error Team is working on it" });

    }
}

const updateStudent = async (req, res) => {
    res.send("request is comming");

    console.log(req.body);

    try {
        await Student.updateOne({_id:req.body._id},req.body);
        res.json(201, { msg: 'modified' })
    } catch (err) {
        res.json(500, { msg: "Internal Server Error Team is working on it" });

    }
}

const createBatch = async (req, res) => {

    try {
        const batch = new Batch(req.body);
        await batch.save();
        res.json(201, { msg: 'created ' })
    } catch (err) {
        res.status(500);
        res.json(500, { msg: "Internal Server Error Team is working on it" });
    }
}


const updateBatch = async (req, res) => {
    res.send("request is comming");

    console.log(req.body);

    try {
        await Batch.updateOne({_id:req.body._id},req.body);
        res.json(201, { msg: 'modified' })
    } catch (err) {
        res.json(500, { msg: "Internal Server Error Team is working on it" });

    }
}


module.exports = {
    createStudent, createTeacher, updateStudent, updateTeacher, createBatch
}

