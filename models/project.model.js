const mongoose = require('mongoose');

let ProjectSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  title: {
    type: String
  },
  link: {
    type: String
  },
  message: {
    type: String
  },
  thumbnail: {
    type: String
  }
});

module.exports = Project = mongoose.model('Project', ProjectSchema);