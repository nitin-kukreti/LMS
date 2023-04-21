const mongoose=require('mongoose')

  
  // StudentAccount schema
  const studentAccountSchema = new mongoose.Schema({
   
    userType:{type:String,default:"student"},
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    batch: { type:  mongoose.Types.ObjectId, required: true,ref:'batch' },
  });
  
  // TeacherAccount schema
  const teacherAccountSchema = new mongoose.Schema({
    userType:{type:String,default:"teacher"},
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    batches: [
      
        { type:  mongoose.Types.ObjectId, required: true,ref:'batch' },
     
    ],
  });

 

const teacher=mongoose.model("teacher",teacherAccountSchema,'accounts')

const student=mongoose.model('student',studentAccountSchema,'accounts')

module.exports ={
    teacher,student
}




