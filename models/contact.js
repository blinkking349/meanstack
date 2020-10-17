'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ContactSchema = Schema({
    firstName: String,
    lastName: String,
    subject: String,
    emailAddress: String,
    phoneNumber: String,
    message: String,
    
});

module.exports = mongoose.model('Contact', ContactSchema);