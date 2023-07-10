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
  await User_Details.findOneAndUpdate(
    { _id: req.body.userID },
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


//get complains list by id and status
router.get('/list', async (req, res) => {
  let { id, status,role } = req.query;
  let ComplaineList = [];
  
  if(status === 'Pending') {
    status = ['Pending']
    ComplaineList = await Complaine_Details.find({ userID: id, status});
  } else if(status === 'Completed') {  // Complainer 
    status = ['Completed']
    ComplaineList = await Complaine_Details.find({ userID: id, status});
  } 
  else if(status === 'CompletedA')   //Admin   --> only check status
  {
    status = ['CompletedA', 'Completed']
    ComplaineList = await Complaine_Details.find({status});
  }
  else if(status === 'CompletedS')   //Supervisor   
  {
    status = ['CompletedS']
    ComplaineList = await Complaine_Details.find({ userID: id, status});
  }
  else if(status === 'AssignedA' &  role !== 'admin' )  // Complainer
  {
    status = ['AssignedA', 'AssignedS', 'AssignedL', 'CompletedL', 'CompletedS', 'CompletedA', 'DeclinedL', 'DeclinedS', 'DeclinedA']
    ComplaineList = await Complaine_Details.find({ userID: id, status});
  } 
  else if(status === 'AssignedS' &  role === 'supervisor' )  // Supervisor new complains
  {
    status = ['AssignedS']                
    ComplaineList = await Complaine_Details.find({ userID: id, status});
  }
  else if(status === 'AssignedA' &  role === 'admin' )  // Complainer
  {
    status = ['AssignedA']
    ComplaineList = await Complaine_Details.find({status});
  }

  else if(status === 'AssignedS' &  role !== 'supervisor'  )  //Admin  --> only check status
  {
    status = ['AssignedS', 'AssignedL', 'CompletedL', 'CompletedS','DeclinedL', 'DeclinedS', 'DeclinedA']
    ComplaineList = await Complaine_Details.find({status});
  } 

  else if(status === 'AssignedL' &  role === 'supervisor')  // supervisor
  {
    status = ['AssignedL', 'CompletedL', 'DeclinedL']
    ComplaineList = await Complaine_Details.find({ userID: id, status});
  } 
  else if(status === 'AssignedL' &  role !== 'supervisor')  // supervisor
  {
    status = ['AssignedL']
    ComplaineList = await Complaine_Details.find({ userID: id, status});
  } 
  else if(status === 'CompletedL') {
    status = ['CompletedL', 'CompletedS', 'CompletedA', 'DeclinedL', 'DeclinedS', 'DeclinedA']
    ComplaineList = await Complaine_Details.find({ userID: id, status});
  }  else if(status === 'DeclinedL') {
    status = ['DeclinedL', 'DeclinedS', 'DeclinedA']
    ComplaineList = await Complaine_Details.find({ userID: id, status});
  } else if(status === 'DeclinedS') {
    status = ['DeclinedS', 'DeclinedA']
    ComplaineList = await Complaine_Details.find({ userID: id, status});
  } else if(status === 'DeclinedA') {
    status = ['DeclinedA']
    ComplaineList = await Complaine_Details.find({ userID: id, status});
  } else {
    status = ['Declined']
    ComplaineList = await Complaine_Details.find({ userID: id, status});
  }

  console.log(id, status);


  if (!ComplaineList) {
    res.status(500).json({ success: false });
  }
  res.send(ComplaineList);
  console.log(ComplaineList);
});


//get 1 complain by id 
router.get('/complainbyid/:complainId', async (req, res) => {

  const   Complaine = await Complaine_Details.findById(req.params.complainId);
   
  if (!Complaine) {
      res.status(500).json({ success: false })
  }
  res.send(Complaine);
//  console.log(ComplaineList);
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

