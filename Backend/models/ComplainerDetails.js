const mongoose = require('mongoose');

const ComplainerDetailsSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    role: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: ''
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})


exports.Complainer_Details = mongoose.model('complainer-details', ComplainerDetailsSchema);


