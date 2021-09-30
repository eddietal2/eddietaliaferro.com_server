const mongoose = require('mongoose');

let ContactSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  fullName: {
    type: String
  },
  email: {
    type: String
  },
  message: {
    type: String
  }
});

module.exports = Contact = mongoose.model('Contact', ContactSchema);