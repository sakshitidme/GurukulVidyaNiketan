const mongoose = require('mongoose');

// A Schema defines the structure of the data we want to save
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject']
  },
  message: {
    type: String,
    required: [true, 'Please provide a message']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// A Model is used to interact with the database (create, read, etc.)
module.exports = mongoose.model('Contact', contactSchema);
