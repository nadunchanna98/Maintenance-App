const { Supervisor_Details } = require('../models/Supervisor');
const { User_Details } = require('../models/User');
const express = require('express');
const router = express.Router();
require('dotenv/config');


// Get all Supervisors with merged details
router.get('/list/', async (req, res) => {
  try {
    const supervisorList = await Supervisor_Details.aggregate([
      {
        $lookup: {
          from: 'user-details', // Name of the User_Details collection
          localField: 'userID',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: '$userDetails'
      }
    ]);

    res.send(supervisorList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});



router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  // console.log(userId);
  
  try {
    const user = await User_Details.findById(userId).exec();

    if (!user) {
      return res.status(404).send('User not found');
    }

    let Data = null;

      Data = await Supervisor_Details.findOne({ userID: userId }).exec();
   

    const combinedData = {
      user: user.toObject(),
      Data: Data ? Data.toObject() : null,
    };

    console.log(combinedData);
  
    res.status(200).send(combinedData);

    console.log(combinedData);


  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving user');
  }
});






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

// //delete by id
// router.delete('/user/:id', (req, res) => {

//   User_Details.findByIdAndRemove(req.params.id).then(user => {
//       if (user) {
//           return res.status(200).json({ success: true, message: 'user deleted!' })
//       } else {
//           return res.status(404).json({ success: false, message: "user not found!" })
//       }
//   }).catch(err => {
//       return res.status(500).json({ success: false, error: err })
//   })
// })


//delete by id

router.delete('/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    Supervisor_Details.findByIdAndRemove(userId).then(user => {
      if (user) {
          return res.status(200).json({ success: true, message: 'user deleted!' })
      } else {
          return res.status(404).json({ success: false, message: "user not found!" })
      }
  }).catch(err => {


      return res.status(500).json({ success: false, error: err })
  })
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting user');
  }
});





  module.exports = router;


//   {"name": "anuka mithara",
//     "phone": "0712345678",
//     "email": "anuka@gmail.com",
//     "password": "1234",
//     "role": "complainer",
//     "type": "student",
//     "image": "" }
