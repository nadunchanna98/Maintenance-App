const { Complainer_Details } = require('../models/ComplainerDetails');
const express = require('express');
const router = express.Router();
require('dotenv/config');

//get all complainer
router.get('/', async (req, res) => {
    const complainerList = await Complainer_Details.find();

    if (!complainerList) {
        res.status(500).json({ success: false })
    }
    res.send(complainerList);
})


       


//add new complainer 
router.post('/add/', async (req, res) => {
    let newComplainer = new Complainer_Details({
  
        name: req.body.name,
        phone: req.body.phone,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role,
        type: req.body.type,
        image: req.body.image, 

    })

    newComplainer = await newComplainer.save();

    if (!newComplainer)
      return res.status(400).send('new Complainer cannot be add!')
  
    res.send(newComplainer);
  })

  module.exports = router;


//   {"name": "anuka mithara",
//     "phone": "0712345678",
//     "email": "anuka@gmail.com",
//     "password": "1234",
//     "role": "complainer",
//     "type": "student",
//     "image": "" }
