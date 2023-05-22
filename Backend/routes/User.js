const { User_Details } = require('../models/User');
const { Supervisor_Details } = require('../models/Supervisor');
const express = require('express');
const router = express.Router();
require('dotenv/config');


//get complainers and supervisors all together
router.get('/', async (req, res) => {
  try {
    const users = await User_Details.find().exec();
    const supervisors = await Supervisor_Details.find().exec();

    const userMap = new Map();

    // Adding users to the map
    for (const user of users) {
      userMap.set(user._id.toString(), {
        user: user,
        supervisor: null
      });
    }

    // Adding supervisors to the map along with their corresponding user details
    for (const supervisor of supervisors) {
      const supervisorId = supervisor.userID?.toString(); // Add a nullish coalescing operator to check for undefined value
      if (supervisorId && userMap.has(supervisorId)) {
        // If the supervisor's userID exists in users, update it with supervisor's details
        userMap.get(supervisorId).supervisor = supervisor;
      } else {
        // If the supervisor's userID doesn't exist in users, add it as a separate entry
        userMap.set(supervisorId, {
          user: null,
          supervisor: supervisor
        });
      }
    }

    // Convert the map values to an array of combined users and supervisors
    const combinedUsers = Array.from(userMap.values());

    // Add normal users without supervisors to the array
    for (const user of users) {
      const userId = user._id.toString();
      if (!userMap.has(userId)) {
        combinedUsers.push({
          user: user,
          supervisor: null
        });
      }
    }

    res.status(200).send(combinedUsers); // Set the status to 200 and send the response
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving users'); // Set the status to 500 and send the error message
  }
});


//get all complainers only
router.get('/complainers/', async (req, res) => {
  const userList = await User_Details.find();

  if (!userList) {
    res.status(500).json({ success: false })
  }

  res.send(userList);
})


// //add new user 
router.post('/add/', async (req, res) => {
  try {
    let newUser = new User_Details({
      name: req.body.name,
      mobile_no: req.body.mobile_no,
      password: req.body.password,
      email: req.body.email,
      complainer_type: req.body.complainer_type,
    });

    let supervisor = null;

    if (req.body.role === 'supervisor') {
      supervisor = new Supervisor_Details({
        userID: newUser._id, // Set the supervisor's userID as the newly created user's _id
        work_type: req.body.work_type,
      });
    }

    newUser = await newUser.save();

    if (supervisor) {
      supervisor.userID = newUser._id; // Update the supervisor's userID to match the newUser's _id
      supervisor = await supervisor.save();
    }

    if (!newUser) {
      return res.status(400).send('New user cannot be added!');
    }

    const combinedData = {
      supervisor: supervisor ? supervisor.toObject() : null,
      user: newUser.toObject(),
    };

    res.send(combinedData);
  } catch (error) {
    res.status(500).send('Error adding user');
  }
});

//change by id
router.put('/user/edit/:id', async (req, res) => {

  const User = await User_Details.findOneAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        
      },
      { new: true }  // to get the updated data
  )

  if (!User)
      return res.status(400).send('User cannot be edit!')

  res.send(User);
 // console.log(Note);
})

//delete by id
router.delete('/user/:id', (req, res) => {

  User_Details.findByIdAndRemove(req.params.id).then(user => {
      if (user) {
          return res.status(200).json({ success: true, message: 'user deleted!' })
      } else {
          return res.status(404).json({ success: false, message: "user not found!" })
      }
  }).catch(err => {
      return res.status(500).json({ success: false, error: err })
  })
})


module.exports = router;


//   {"name": "anuka mithara",
//     "phone": "0712345678",
//     "email": "anuka@gmail.com",
//     "password": "1234",
//     "role": "complainer",
//     "type": "student",
//     "image": "" }
