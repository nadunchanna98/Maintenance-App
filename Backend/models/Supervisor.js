const mongoose = require('mongoose');

const SupervisorSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User_Details' 
    },
    work_type: { 
        type: String, 
    },
    approved_date: {          
        type: Date,
        default: Date.now
     },
     complains: [{    //list of complains assigned to the supervisor 
        type: mongoose.Schema.Types.ObjectId, ref: 'Complaine_Details'
        }],
  }
  
  );

exports.Supervisor_Details = mongoose.model('supervisor-details', SupervisorSchema);