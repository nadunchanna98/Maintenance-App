const { Supervisor_Details } = require('../models/Supervisor');
const { Labour_Details } = require('../models/Labour');
const { User_Details } = require('../models/User');
const { Labour_Pending } = require('../models/LabourPending');
const { Supervisor_Pending } = require('../models/SupervisorPending');
const express = require('express');
const router = express.Router();
require('dotenv/config');

// Approve pending data
router.post('/approve/:id/:role/:approvedby', async (req, res) => {

    // console.log("approve :",req.params.id,req.params.role,req.params.approvedby);


    try {
        if (req.params.role === 'supervisor') {

            //console.log("supervisor :", req.params.id, req.params.role, req.params.approvedby);
            // Move data from Supervisor_Pending to Supervisor_Details

            const pendingSupervisor = await Supervisor_Pending.findOne({ userID: req.params.id });
 
            console.log("pendingSupervisor :", pendingSupervisor);

            const supervisor = new Supervisor_Details({
                userID: pendingSupervisor.userID,
                work_type: pendingSupervisor.work_type,
                approvedby: req.params.approvedby,
                approved_date: Date.now(),
                requested_date: pendingSupervisor.requested_date
            });

            console.log("supervisor :", supervisor);

            const savedSupervisor = await supervisor.save();

            console.log("savedSupervisor :", savedSupervisor);

            // Delete from Supervisor_Pending collection
            await Supervisor_Pending.deleteOne({ userID: req.params.id });

            res.json(savedSupervisor);
        } else if (req.params.role === 'labour') {


            // Move data from Labour_Pending to Labour_Details
            const pendingLabour = await Labour_Pending.findOne({ userID: req.params.id });

           // console.log("pendingLabour :", pendingLabour);

            const labour = new Labour_Details({
                userID: pendingLabour.userID,
                approvedby: req.params.approvedby,
                approved_date: Date.now(),
                requested_date: pendingLabour.requested_date
            });


            console.log("labour :", labour);

            const savedLabour = await labour.save();

            console.log("savedLabour :", savedLabour);


            // Delete from Labour_Pending collection
            await Labour_Pending.deleteOne({userID: req.params.id });

            res.json(savedLabour);
        } else {
            res.status(400).json({ message: 'Invalid role provided' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
});


router.get('/pendinglabours', async (req, res) => {

    try {
        const pendingLabours = await Labour_Pending.find();
        res.json(pendingLabours);
    } catch (err) {
        res.json({ message: err });
    }
});



module.exports = router;
