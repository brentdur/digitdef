'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
  full: String,
  thumb: String,
  date: String,
  alt: String,
  update: String,
  tags: [String],
  views: {type: Number, default:0}
});

ImageSchema.methods.toggleUpdate = function(status, cb) {
  this.update = status.status;
  this.save(cb);
};

ImageSchema.methods.view = function(cb){
  this.views += 1;
  this.save(cb);
};

module.exports = mongoose.model('Image', ImageSchema);
