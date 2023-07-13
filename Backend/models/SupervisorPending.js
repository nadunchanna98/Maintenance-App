const mongoose = require('mongoose');

const SupervisorPendingSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User_Details' 
    },
    work_type: { 
        type: String, 
    },
    requested_date: {          
        type: Date,
        default: Date.now
     },
  }
  
  );

exports.Supervisor_Pending = mongoose.model('supervisor-pending', SupervisorPendingSchema);