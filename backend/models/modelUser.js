const mongoose = require('mongoose');

const user = mongoose.Schema({
    email: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true },
    phoneNumber: { type: Number, required: true },
    travelsCreated: [String],
    travelsRegistered: [String]
});

module.exports = mongoose.model('User', user);