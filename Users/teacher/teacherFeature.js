const { Batch } = require("mongodb");

const uploadAssignment = async (req, res) => {
     const { batchId, title, description, dueDate } = req.body;
     const teacherId = req.user._id; // Assuming teacher is logged in
   
     try {
       const batch = await Batch.findById(batchId);
       if (!batch) {
         return res.status(404).json({ error: 'Batch not found' });
       }
       
       if (!batch.teachers.includes(teacherId)) {
         return res.status(401).json({ error: 'You are not authorized to upload assignments to this batch' });
       }
   
       const files = req.files;
       const attachments = [];
       if (files) {
         // Save attachments to disk and add their paths to attachments array
         for (const key in files) {
           const file = files[key];
           const fileName = `${batchId}_${Date.now()}_${file.name}`;
           await file.mv(`./uploads/${fileName}`);
           attachments.push(fileName);
         }
       }
   
       const assignment = {
         title,
         description,
         deadline: dueDate,
         createdBy: teacherId,
         attachments
       };
   
       batch.assignments.push(assignment);
       await batch.save();

       res.status(201).json({ message: 'Assignment uploaded successfully' });
     } catch (err) {
       console.error(err);
       res.status(500).json({ error: 'Server error' });
     }
   };