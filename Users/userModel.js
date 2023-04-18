const mongoose=require('mongoose')

  
  // StudentAccount schema
  const studentAccountSchema = new mongoose.Schema({
   
    userType:{type:String,default:"student"},
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    batch: {
      id: { type: String, required: true },
    },
  });
  
  // TeacherAccount schema
  const teacherAccountSchema = new mongoose.Schema({
    userType:{type:String,default:"teacher"},
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    batches: [
      {
        id: { type: String, required: true },
      },
    ],
  });

 

 const teacher=mongoose.model("accounts",teacherAccountSchema)

const student=mongoose.model('accounts',studentAccountSchema)

module.exports ={
    teacher,student
}


