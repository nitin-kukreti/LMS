const mongoose=require('mongoose')

// AdminAccount schema
const adminAccountSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  });
  
  // StudentAccount schema
  const studentAccountSchema = new mongoose.Schema({
    id: { type: String, required: true },
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
    id: { type: String, required: true },
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

  export const admin=mongoose.model("admins",adminAccountSchema);

  export const teacher=mongoose.model("teachers",teacherAccountSchema)

  export const student=mongoose.model('students',studentAccountSchema)
  

