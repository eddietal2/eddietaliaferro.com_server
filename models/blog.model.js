const mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  comment: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  picture: {
    type: String
  },
  replies: {
    type: Array
  },
});
let ReplySchema = new mongoose.Schema({
  date: {
    type: Date
  },
  reply: {
    type: String
  },
  name: {
    type: String
  },
  picture: {
    type: String
  },
  email: {
    type: String
  }
});

let BlogSchema = new mongoose.Schema({
  title: {
    type: String
  },
  visible: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date
  },
  hashtags: {
    type: Array,
    default: []
  },
  thumbnail: {
    type: String
  },
  post: {
    type: String
  },
  comments: {
    type: [CommentSchema],
    default: []
  },
  picture_1: {
    type: String,
  },
  picture_2: {
    type: String,
  },
  picture_3: {
    type: String,
  },
  picture_4: {
    type: String,
  },
  picture_5: {
    type: String,
  },
})

module.exports = Blog = mongoose.model('Blog', BlogSchema);