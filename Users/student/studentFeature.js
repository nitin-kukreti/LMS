const { Course } = require('../../course/model')
const Batch=require('../../batch/batch')
const fs=require('fs');


//  user can access courses which is included in its batch
const getCources = (req, res) => {
    try{
        const user=req.user;
        const batch=Batch.findById(user.batch);
        if(!batch){
            res.status(404).json({ msg: "batch not found" });
        }
        const courses=batch.courses;
        res.json(200,courses);
        
    }catch(err){
        console.log("Internal Server Error");
    }
}




const path = require('path');
const streamVideo = (req, res) => {
    try{
        const courseId = req.params.courseId;
        const lectureId = req.params.lectureId;
        const quality = req.params.quality;
        const course = Course.findById(courseId);
        if(course){
            const lecture = course.lectures.find(l => l.id === lectureId);
            if (!lecture) {
              res.status(404).json({ msg: "Lecture not found" });
              return;
            }
            const video = lecture.videos.find(l => l.quality === quality);
            const videoPath = path.resolve(video.path);
            const stat = fs.statSync(videoPath);
            const fileSize = stat.size;
            const range = req.headers.range;
            if (range) {
              const parts = range.replace(/bytes=/, "").split("-");
              const start = parseInt(parts[0], 10);
              const end = parts[1] 
                ? parseInt(parts[1], 10)
                : fileSize - 1;
              const chunksize = (end - start) + 1;
              const file = fs.createReadStream(videoPath, {start, end});
              const headers = {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunksize,
                "Content-Type": "video/mp4",
              };
              res.writeHead(206, headers);
              file.pipe(res);
            } else {
              res.status(416).send("Range Not Satisfiable");
            }
    
        } else {
            res.status(404).json({msg: "Course not exists"});
        }

    } catch(err) {
        console.log("Internal Server Error");
    }
}

module.exports = {
    getCources, streamVideo
}

