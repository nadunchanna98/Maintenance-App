const mongoose = require('mongoose');

const SupervisorSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User_Details' 
    },
    approvedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_Details'
    },
    approved_date: {          
        type: Date,
     },
     requested_date: {          
        type: Date,
     },
     complains: [{    //list of complains assigned to the supervisor 
        type: mongoose.Schema.Types.ObjectId, ref: 'Complaine_Details'
        }],
  }
  
  );

exports.Labour_Details = mongoose.model('labour-details', SupervisorSchema);