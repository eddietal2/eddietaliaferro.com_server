const mongoose = require('mongoose');

let DonateSchema = new mongoose.Schema({
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
  },
  amount: {
    type: Number
  }
});

module.exports = Donate = mongoose.model('Donate', DonateSchema);