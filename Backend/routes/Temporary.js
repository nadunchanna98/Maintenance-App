const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
         required: true 
        },
    email: { 
        type: String,
        // required: true,
        // unique: true
     },
    mobilenumber :{
        type:String,
        required:true,
        unique:true   
    },
    password: { 
        type: String,
        required: true 
    },
    role: { 
        type: String, 
        enum: ['complainer', 'supervisor'],
        default: 'complainer'
     },
    accepted: {     //check wether the user is accepted by the admin as a supervisor
        type: Boolean, 
        default: false
     },
     complainer_type: {
        type: String,
        enum: ['student', 'staff', 'other'], //??
        default: 'other'
        },
  });
  
  const supervisorSchema = new mongoose.Schema({
    user: {
         type: mongoose.Schema.Types.ObjectId, ref: 'userSchema' 
        },
    type: { 
        type: String, 
        required: true 
    },
    approved_date: {          
        type: Date,
        required: true,
        default: Date.now
     },
     complains: [{    //list of complains assigned to the supervisor 
        type: mongoose.Schema.Types.ObjectId, ref: 'complaintSchema'
        }],
  });
  
  const complaintSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
     },
     supervisor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Supervisor' 
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
  


