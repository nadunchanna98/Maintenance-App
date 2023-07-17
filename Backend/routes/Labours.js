const { Labour_Details } = require('../models/Labour');
const { User_Details } = require('../models/User');
const express = require('express');
const router = express.Router();
require('dotenv/config');


// Get all labour details
router.get('/list/', async (req, res) => {
    try {
      const List = await Labour_Details.aggregate([
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
  
      res.send(List);
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
  
        Data = await Labour_Details.findOne({ userID: userId }).exec();
     
  
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

  



  module.exports = router;