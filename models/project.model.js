const mongoose = require('mongoose');

let ProjectSchema = new mongoose.Schema({
  title: {
    type: String
  },
  url: {
    type: String
  },
  description: {
    type: String
  },
  thumbnail: {
    type: String
  },
  visible: {
    type: Boolean,
    default: false
  }
});

module.exports = Project = mongoose.model('Project', ProjectSchema);