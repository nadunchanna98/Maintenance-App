const { Supervisor_Details } = require('../models/Supervisor');
const express = require('express');
const router = express.Router();
require('dotenv/config');

//get all complainer
router.get('/', async (req, res) => {
    const SupervisorList = await Supervisor_Details.find();

    if (!userList) {
        res.status(500).json({ success: false })
    }

    res.send(SupervisorList);
})


//add new complainer 
router.post('/add/', async (req, res) => {
    let newSupervisor = new Supervisor_Details({
  
        userID: req.body.userID,
        type: req.body.type,
        complains: req.body.type, 

    })

    newSupervisor = await newSupervisor.save();

    if (!newSupervisor)
      return res.status(400).send('new Supervisor cannot be add!')
  
    res.send(newSupervisor);
  })

  module.exports = router;


//   {"name": "anuka mithara",
//     "phone": "0712345678",
//     "email": "anuka@gmail.com",
//     "password": "1234",
//     "role": "complainer",
//     "type": "student",
//     "image": "" }
