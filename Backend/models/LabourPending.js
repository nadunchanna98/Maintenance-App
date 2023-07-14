const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User_Details' 
    },
    requested_date: {          
        type: Date,
        default: Date.now
     },

  });
  
exports.Labour_Pending = mongoose.model('labour-pending', UserSchema );