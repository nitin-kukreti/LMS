const { Course, Lecture } = require('./model');
const { v4: uuidv4 } = require('uuid');
var path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

const createCourse = async (req, res) => {
  try {
    const course = new Course({
      name: req.body.name,
      description: req.body.description,
      thumbnail: "",
      lectures: []
    });

    // Check if thumbnail is present in the request
    if (req.files && req.files.thumbnail) {
      const thumbnail = req.files.thumbnail;
      // Generate a unique filename for the thumbnail
      const thumbnailName = uuidv4() + path.extname(thumbnail.name);
      // Move the thumbnail to the server's file system

      await thumbnail.mv(`./public/thumbnail/${thumbnailName}`);
      course.thumbnail = `./thumbnail/${thumbnailName}`;
    }

    // Save the course to the database
    const savedCourse = await course.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: savedCourse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating course",
      error: error.message
    });
  }
};

const createLecture = async (req, res) => {
  const courseId = req.params.courseId;

  try {
    // Get course by courseId

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }



    // Check if lecture order already exists in course
    const order = req.body.order;
    const existingLecture = course.lectures.find(
      (lecture) => lecture.order === order
    );
    if (existingLecture) {
      return res.status(400).json({
        message: `Lecture with order ${order} already exists in course`,
      });
    }

    // Handle uploaded video file
    const videoFile = req.files.video;
    if (!videoFile) {
      return res.status(400).json({ message: 'Video file is required' });
    }

    // Generate unique file name for video file
    const videoFileExt = path.extname(videoFile.name);
    const videoFileName = uuidv4() + videoFileExt;

    // Save video file to disk
    const dir = `./data/courses/${courseId}/original`;
    if (!fs.existsSync(dir)) { // check if the folder exists
      fs.mkdirSync(dir, { recursive: true }); // create the folder if it doesn't exist
    }
    const videoPath = `${dir}/${videoFileName}`;
    await videoFile.mv(videoPath);

    // Convert video to different qualities using ffmpeg
    const videoQualities = [{ quality: '426x240', bitrate: '500k' }, { quality: '640x360', bitrate: '800k' }, { quality: '854x480', bitrate: '1000k' }, { quality: '1280x720', bitrate: '2500k' }, { quality: '1920x1080', bitrate: '5000k' }]
    const videoPaths = [];
    const video = ffmpeg(videoPath);
    video.videoCodec('libx264')
      .audioCodec('copy');
    for (const { quality, bitrate } of videoQualities) {

      const outputFileName = `${uuidv4()}.mp4`;
      const outputPath = `./data/courses/${courseId}/${quality}/${outputFileName}`;
      const folder = `./data/courses/${courseId}/${quality}`;
      videoPaths.push({ quality: quality, path: outputPath })
      if (!fs.existsSync(folder)) { // check if the folder exists
        fs.mkdirSync(folder, { recursive: true }); // create the folder if it doesn't exist
      }
      video.output(outputPath)
        .size(quality)
        .videoBitrate(bitrate)
        .on('end', () => {
          console.log('Video conversion complete!');
        })
        .on('error', (err) => {
          console.error('Error during video conversion:', err);
        });


    }
    video.run();

    let docPath = null;
    if (req.files && req.files.doc) {
      const docFile = req.files.doc;
      const docName = `${uuidv4()}.${docFile.name.split('.').pop()}`;

      docPath = `./data/courses/${courseId}/${docName}`;

      await docFile.mv(docPath);
    }
    let thumbnailPath=null
    if (req.files && req.files.thumbnail) {
      const thumbnail = req.files.thumbnail;
      // Generate a unique filename for the thumbnail
      const thumbnailName = uuidv4() + path.extname(thumbnail.name);
      // Move the thumbnail to the server's file system

      await thumbnail.mv(`./public/thumbnail/${thumbnailName}`);
      thumbnailPath = `./thumbnail/${thumbnailName}`;
    }
 

    // Save lecture to course
    const lecture = {
      title: req.body.title,
      description: req.body.description,
      thumbnail: thumbnailPath ? thumbnailPath : '',
      videos: videoPaths.map(({ quality, path }) => ({
        quality: quality,
        path: path,
      })),
      doc: docPath ? docPath : '',
      order: order,
    };
    await Course.findByIdAndUpdate(courseId,{'$push':{'lectures':lecture}});

    res.status(201).json({ message: 'Lecture created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createCourse, createLecture
}