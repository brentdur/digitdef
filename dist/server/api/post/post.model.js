'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  date: String,
  link: String,
  summary: {type: String, default: ''},
  visibleMore: Boolean,
  views: {type: Number, default: 0},
  update: String,
  tags: [String],
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  content: String
});

PostSchema.methods.toggleUpdate = function(status, cb) {
  this.update = status.status;
  this.save(cb);
};

PostSchema.methods.view = function(cb){
  this.views += 1;
  this.save(cb);
};

module.exports = mongoose.model('Post', PostSchema);
