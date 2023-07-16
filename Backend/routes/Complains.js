const { Supervisor_Details } = require('../models/Supervisor');
const { User_Details } = require('../models/User');
const { Complaine_Details } = require('../models/Complains');
const express = require('express');
const router = express.Router();
require('dotenv/config');
const setTimeoutPromise = require('util').promisify(setTimeout);

// Add new complaint with timer
router.post('/add/', async (req, res) => {
  let newComplaint = new Complaine_Details({
    userID: req.body.userID,
    title: req.body.title,
    location: req.body.location,
    description: req.body.description,
    status: req.body.status,
    supervisorID: req.body.supervisorID,
    supervisor_feedback: req.body.supervisor_feedback,
    admin_feedback: req.body.admin_feedback,
    assigned_date: req.body.assigned_date,
    resolved_date: req.body.resolved_date,
  });

  console.log('newComplaint: ', newComplaint);
  newComplaint = await newComplaint.save();

  if (!newComplaint)
    return res.status(400).send('New complaint cannot be added!');

  // Update the Supervisor_Details collection with the new complaint
  await User_Details.findOneAndUpdate(
    { _id: req.body.userID },
    { $push: { complains: newComplaint._id } }
  );

  // Start the timer to change the status after 30 minutes
  const timer = setTimeoutPromise(1 * 60 * 1000).then(async () => {
    // Find the complaint by ID
    const complaint = await Complaine_Details.findById(newComplaint._id);
    if (!complaint) {
      console.error(`Complaint not found with ID: ${newComplaint._id}`);
      return;
    }

    // Check if the current status is still 'Pending'
    if (complaint.status === 'Pending') {
      // Update the status to 'AssignedA'
      complaint.status = 'AssignedA';
      await complaint.save();
      console.log(`Complaint status updated: ${complaint._id}`);
    }
  });

  res.send(newComplaint);
  console.log('newComplaint: ', newComplaint);
});

// Edit complaint with timer
router.put('/edit/:complaintId', async (req, res) => {
  const { complaintId } = req.params;

  // Update the complaint with the new details
  const updatedComplaint = await Complaine_Details.findByIdAndUpdate(complaintId, req.body);

  if (!updatedComplaint) {
    return res.status(400).send('Complaint not found');
  }

  // Reset the timer by canceling the existing one and starting a new 30-minute timer
  clearTimeout(updatedComplaint.timer);

  updatedComplaint.timer = setTimeoutPromise(30 * 60 * 1000).then(async () => {
    // Find the updated complaint by ID
    const complaint = await Complaine_Details.findById(complaintId);
    if (!complaint) {
      console.error(`Complaint not found with ID: ${complaintId}`);
      return;
    }

    // Check if the current status is still 'Pending'
    if (complaint.status === 'Pending') {
      // Update the status to 'AssignedA'
      complaint.status = 'AssignedA';
      await complaint.save();
      console.log(`Complaint status updated: ${complaint._id}`);
    }
  });

  res.send('Complaint updated successfully');
});

// // edit complaint without timer
// router.put('/complainbyid/:complaintId', async (req, res) => {

//   const { complaintId } = req.params;
//   // console.log('compaint by id', complaintId);

//   const { 
//     status,
//     supervisor_feedback,
//     resolved_date,
//   } = req.body;

//   // console.log("resolved_date", resolved_date);

//   try {
//     const updatedComplaint = await Complaine_Details.findByIdAndUpdate(complaintId, {
//       status,
//       supervisor_feedback,
//       resolved_date
//     });
  
//     if (!updatedComplaint) {
//       return res.status(400).send('Complaint not found');
//     }
  
//     res.send('Complaint updated successfully');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

router.put('/complain/:complaintId', async (req, res) => {
  const { complaintId } = req.params;
  const updateFields = req.body;

  try {
    const updatedComplaint = await Complaine_Details.findByIdAndUpdate(complaintId, updateFields);

    if (!updatedComplaint) {
      return res.status(400).send('Complaint not found');
    }

    res.send('Complaint updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});





// // Add new complaint without timer
// router.post('/add/', async (req, res) => {
//   let newComplaint = new Complaine_Details({
//     userID: req.body.userID,
//     title: req.body.title,
//     location: req.body.location,
//     description: req.body.description,
//     status: req.body.status,
//     supervisorID: req.body.supervisorID,
//     supervisor_feedback: req.body.supervisor_feedback,
//     admin_feedback: req.body.admin_feedback,
//     assigned_date: req.body.assigned_date,
//     resolved_date: req.body.resolved_date,
//   });

//   console.log('newComplaint: ', newComplaint);
//   newComplaint = await newComplaint.save();

//   if (!newComplaint)
//     return res.status(400).send('New complaint cannot be added!');

//   // Update the Supervisor_Details collection with the new complaint
//   await User_Details.findOneAndUpdate(
//     { _id: req.body.userID },
//     { $push: { complains: newComplaint._id } }
//   );

//   res.send(newComplaint);
//   console.log('newComplaint: ', newComplaint);
// });

//get all complains
router.get('/', async (req, res) => {
  const ComplaineList = await Complaine_Details.find();

  if (!ComplaineList) {
    res.status(500).json({ success: false })
  }

  res.send(ComplaineList);
})


//get complains list by id and status
router.get('/list', async (req, res) => {
  let { id, status, role } = req.query;
  let ComplaineList = [];
  console.log('id: ', id);


  if (status === 'Pending') {

    status = ['Pending']
    ComplaineList = await Complaine_Details.find({ userID: id, status }).sort({ createdAt: -1 });;

  } else if (status === 'Completed') {  // Complainer 
    status = ['Completed']
    ComplaineList = await Complaine_Details.find({ userID: id, status }).sort({ createdAt: -1 });;
  }
  else if (status === 'CompletedA')   //Admin   --> only check status
  {
    status = ['CompletedA', 'Completed']
    ComplaineList = await Complaine_Details.find({ status }).sort({ createdAt: -1 });;

  }
  else if (status === 'CompletedS' & role === 'supervisor')   //Supervisor   
  {
    status = ['CompletedS']

    ComplaineList = await Complaine_Details.find({ supervisorID: id, status }).sort({ createdAt: -1 });;

  }
  else if (status === 'CompletedS' & role === 'admin' )   //admin received by supervisor complete and decline   
  {
    status = ['CompletedS', 'DeclinedS']

    ComplaineList = await Complaine_Details.find({ status }).sort({ createdAt: -1 });;

  }
  else if (status === 'AssignedA' & role !== 'admin')  // Complainer
  {
    status = ['AssignedA', 'AssignedS', 'AssignedL', 'CompletedL', 'CompletedS', 'CompletedA', 'DeclinedL', 'DeclinedS', 'DeclinedA']
    ComplaineList = await Complaine_Details.find({ userID: id, status }).sort({ createdAt: -1 });;
  }
  else if (status === 'AssignedS' & role === 'supervisor')  // Supervisor new complains
  {

    status = ['AssignedS']
    ComplaineList = await Complaine_Details.find({ supervisorID: id, status }).sort({ createdAt: -1 });;

  }
  else if (status === 'AssignedA' & role === 'admin')  // Complainer
  {
    status = ['AssignedA']
    ComplaineList = await Complaine_Details.find({ status }).sort({ createdAt: -1 });;
  }

  else if (status === 'AssignedS' & role !== 'supervisor')  //Admin  --> only check status
  {
    status = ['AssignedS', 'AssignedL', 'CompletedL', 'CompletedS', 'DeclinedL', 'DeclinedS', 'DeclinedA']
    ComplaineList = await Complaine_Details.find({ status }).sort({ createdAt: -1 });;
  }

  else if (status === 'AssignedL' & role === 'supervisor')  // supervisor  inprogress complains
  {
    status = ['AssignedL']
    ComplaineList = await Complaine_Details.find({ supervisorID: id, status }).sort({ createdAt: -1 });;
  }
  else if (status === 'AssignedL' & role !== 'supervisor')  // labour
  {
    status = ['AssignedL']
    ComplaineList = await Complaine_Details.find({ labourID: id, status }).sort({ createdAt: -1 });;
  }
  else if (status === 'CompletedL') {
    status = ['CompletedL', 'CompletedS', 'CompletedA', 'DeclinedL', 'DeclinedS', 'DeclinedA']
    ComplaineList = await Complaine_Details.find({ userID: id, status }).sort({ createdAt: -1 });;
  } else if (status === 'DeclinedL') {
    status = ['DeclinedL', 'DeclinedS', 'DeclinedA']
    ComplaineList = await Complaine_Details.find({ userID: id, status }).sort({ createdAt: -1 });;
  } else if (status === 'DeclinedS') {
    status = ['DeclinedS', 'DeclinedA']
    ComplaineList = await Complaine_Details.find({ userID: id, status }).sort({ createdAt: -1 });;
  } else if (status === 'DeclinedA') {
    status = ['DeclinedA']
    ComplaineList = await Complaine_Details.find({ userID: id, status }).sort({ createdAt: -1 });;
  } else {
    status = ['Declined']
    ComplaineList = await Complaine_Details.find({ userID: id, status }).sort({ createdAt: -1 });;
  }


  if (!ComplaineList) {
    res.status(500).json({ success: false });
  }

  // console.log("ComplaineList: ", ComplaineList);
  res.send(ComplaineList);


});


//get 1 complain by id 
router.get('/complainbyid/:complainId', async (req, res) => {

  const Complaine = await Complaine_Details.findById(req.params.complainId);

  if (!Complaine) {
    res.status(500).json({ success: false })
  }
  res.send(Complaine);
  //  console.log(ComplaineList);
})


//delete complain by id
router.delete('/delete/:complainId', async (req, res) => {
  const complain = await Complaine_Details.findByIdAndRemove(req.params.complainId);

  if (!complain) {
    return res.status(500).json({ success: false, message: 'The complain with the given ID was not found.' });
  }

  res.status(200).json({ success: true, message: 'The complain was deleted.' });
});

//assign complain to supervisor
router.put('/update/:complainId/:userId', async (req, res) => {
  try {
    const complainId = req.params.complainId;
    const userId = req.params.userId;

    // console.log("complainId: ", complainId);
    // console.log("userId: ", userId);

    const complaint = await Complaine_Details.findById(complainId);

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    // Update the complaint with the assigned user ID
    complaint.supervisorID = userId;
    complaint.status = 'AssignedS';
    complaint.assigned_date = Date.now();

    await complaint.save();

    // Add the complaint to the supervisor's complains array
    const supervisor = await Supervisor_Details.findOne({ userID: userId });
    if (!supervisor) {
      return res.status(404).json({ success: false, message: 'Supervisor not found' });
    }
    supervisor.complains.push(complainId);
    await supervisor.save();

    console.log("complaint: ", complaint);

    return res.status(200).json({ success: true, message: 'Complaint assigned successfully' });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// get all complains for a supervisor by supervisor id

router.get('/supervisorcomplains/:userId', async (req, res) => {

  const supervisorId = req.params.userId;

  const status = ['AssignedS', 'AssignedL', 'CompletedS', 'DeclinedS','CompletedA','DeclinedA','Completed']
  
  const supervisor = await Supervisor_Details.findOne({ userID: supervisorId });
  if (!supervisor) {
    return res.status(404).json({ success: false, message: 'Supervisor not found' });
  }

  const complains = await Complaine_Details.find({ supervisorID: supervisorId , status: status });
  if (!complains) {
    return res.status(404).json({ success: false, message: 'Complains not found' });
  }

  return res.status(200).json({ success: true, complains: complains });
});


// get labour current work
router.get('/labourcomplains/:userId', async (req, res) => {

  const labourId = req.params.userId;

  const status = ['AssignedL']

  const labour = await Labour_Details.findOne({ userID: labourId });
  if (!labour) {
    return res.status(404).json({ success: false, message: 'Labour not found' });
  }

  const complains = await Complaine_Details.find({ labourID: labourId, status: status });
  if (!complains) {
    return res.status(404).json({ success: false, message: 'Complains not found' });
  }

  return res.status(200).json({ success: true, complains: complains });
});






module.exports = router;




// {
//   "userID": "5f9e1b0b0b9b3c1e3c3b3c1e",
//   "supervisorID": "5f9e1b0b0b9b3c1e3c3b3c1e",
//   "description": "this is a test complain",
//   "status": "assigned",
//   "supervisor_feedback": "this is a test feedback",
//   "admin_feedback": "this is a test feedback",
//   "assigned_date": "2020-10-31T00:00:00.000Z",
//   "resolved_date": "2020-10-31T00:00:00.000Z"

// }

