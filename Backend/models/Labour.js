const mongoose = require('mongoose');

const LabourSchema = new mongoose.Schema({
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
     Assigned: {
        type: Boolean,
        default: false
     },
     complains: [{    //list of complains assigned to the Labour
        type: mongoose.Schema.Types.ObjectId, ref: 'Complaine_Details'
        }],
  }
  
  );

exports.Labour_Details = mongoose.model('labour-details', LabourSchema);