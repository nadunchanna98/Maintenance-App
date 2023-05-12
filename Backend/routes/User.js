const { User_Details } = require('../models/User');
const { Supervisor_Details } = require('../models/Supervisor');
const express = require('express');
const router = express.Router();
require('dotenv/config');

//get all complainer
router.get('/', async (req, res) => {
    const userList = await User_Details.find();

    if (!userList) {
        res.status(500).json({ success: false })
    }

    res.send(userList);
})


//add new user 
router.post('/add/', async (req, res) => {

 if(req.body.role === 'supervisor'){

    let newSupervisor = new Supervisor_Details({
        
      userID: req.body.userID,
      work_type: req.body.work_type,

    })

    newSupervisor = await newSupervisor.save();

    if (!newSupervisor)
    return res.status(400).send('new Superviser cannot be add!')

  res.send(newSupervisor);
  }else{
    let newUser = new User_Details({
  
      name: req.body.name,
      mobile_no: req.body.mobile_no,
      password: req.body.password,
      email: req.body.email,
      type: req.body.type, 

  })

  newUser = await newUser.save();

  if (!newUser)
  return res.status(400).send('new Conplainer cannot be add!')

res.send(newUser);
  }
  

  })

  module.exports = router;


//   {"name": "anuka mithara",
//     "phone": "0712345678",
//     "email": "anuka@gmail.com",
//     "password": "1234",
//     "role": "complainer",
//     "type": "student",
//     "image": "" }
