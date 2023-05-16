const { Supervisor_Details } = require('../models/Supervisor');
const { User_Details } = require('../models/User');
const { Complaine_Details } = require('../models/Complains');
const express = require('express');
const router = express.Router();
require('dotenv/config');

// Add new complaint
router.post('/add/', async (req, res) => {
  let newComplaint = new Complaine_Details({
    userID: req.body.userID,
    supervisorID: req.body.supervisorID,
    description: req.body.description,
    status: req.body.status,
    supervisor_feedback: req.body.supervisor_feedback,
    admin_feedback: req.body.admin_feedback,
    assigned_date: req.body.assigned_date,
    resolved_date: req.body.resolved_date,
  });

  newComplaint = await newComplaint.save();

  if (!newComplaint)
    return res.status(400).send('New complaint cannot be added!');

  // Update the Supervisor_Details collection with the new complaint
  await Supervisor_Details.findOneAndUpdate(
    { _id: req.body.supervisorID },
    { $push: { complains: newComplaint._id } }
  );

  res.send(newComplaint);
});

//get all complains
router.get('/', async (req, res) => {
    const ComplaineList = await Complaine_Details.find();

    if (!ComplaineList) {
        res.status(500).json({ success: false })
    }

    res.send(ComplaineList);
})




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

