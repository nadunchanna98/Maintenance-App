const mongoose = require('mongoose');
const { User_Details } = require('./User');
const { Supervisor_Details } = require('./Supervisor');

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
        enum: ['Pending', 'assigned', 'Completed','Declined'], 
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