const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    userID: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_Details'
     },
     supervisorID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Supervisor_Details' 
    },
    description: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'AssignedA', 'AssignedS','AssignedL','CompletedL','CompletedS','CompletedA','Completed','DeclinedL','DeclinedS','DeclinedA','Declined'],
        default: 'Pending' 
    },
    created_date: {
            type: Date,
            required: true,
            default: Date.now
    },
    supervisor_feedback: { 
        type: String
    },
    admin_feedback: { 
        type: String
    },
    assigned_date: { 
        type: Date 
    },
    resolved_date: { 
        type: Date 
    }
  });


exports.Complaine_Details = mongoose.model('complain-details', ComplaintSchema);