'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  content: String,
  author: String,
  likes: {type: Number, default: 0},
  post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  date: String
});

module.exports = mongoose.model('Comment', CommentSchema);
