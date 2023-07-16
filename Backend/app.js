const express = require("express");
const app = express();
require('dotenv/config');
const bodyParser = require("body-parser"); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const morgan = require("morgan"); // HTTP request logger middleware for node.js
const mongoose  = require('mongoose'); // Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
const cors  = require('cors');  // for cross origin resource sharing 

mongoose.set('strictQuery', false); 
const api = process.env.API_URL;


app.use(cors());  
app.options('*',cors()); 

// Middleware
app.use(bodyParser.json());  // for parsing application/json
app.use(morgan('tiny'));  // for logging requests to the console (express4)

// Routes
const UserRoutes = require('./routes/User');
const SupervisorRoutes = require('./routes/Supervisor');
const ComplainsRoutes = require('./routes/Complains');
const PendingRoutes = require('./routes/Pending');
const LabourRoutes = require('./routes/Labours');

//api routes
app.use(`${api}/users`, UserRoutes);
app.use(`${api}/supervisors`, SupervisorRoutes);
app.use(`${api}/complains`, ComplainsRoutes);
app.use(`${api}/pending`, PendingRoutes);
app.use(`${api}/labours`, LabourRoutes);    


//Server
app.listen(3000, ()=>{
    console.log('Server is running on port number: http://localhost:3000 ' )
})

// Database
mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'Maintenance-app'
    })

.then(()=>{
   // res.json()
   console.log('Maintenance-App Database is connected...')
}).catch((err)=>{
    console.log('error :',err)
})