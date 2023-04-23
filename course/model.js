const mongoose=require('mongoose')

const videoSchema = mongoose.Schema({
    quality: { type: String, required: true },
    path: { type: String, required: true }
  }, { _id: false });
  
  const lectureSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    videos: { type: [videoSchema], required: true },
    doc: { type: String },
    order: { type: Number, required: true }
  });
  
  const courseSchema = mongoose.Schema({
    name: { type: String, required: true,unique:true},
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    lectures: { type: [lectureSchema], required: true }
  });

  const Course=mongoose.model('course',courseSchema);
  const Video=mongoose.model('video',videoSchema);
  const Lecture=mongoose.model('lecture',lectureSchema);
  module.exports={
    Course,Video,Lecture
  }