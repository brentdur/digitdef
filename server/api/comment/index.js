'use strict';

var express = require('express');
// var controller = require('./comment.controller');
var Comment = require('./comment.model');
var Post = require('../post/post.model');
var auth = require('../../auth/auth.service');

var router = express.Router();

/*Comments: Get all, add to post, findById, delete*/
router.get('/', function(req, res, next){
  Comment.find()
  .populate('post')
  .exec(function(err, comments){
    if(err) { return next(err); }
    res.json(comments);
  });
});

router.param('id', function(req, res, next, id){
  var query = Comment.findById(id);

  query.exec(function(err, comment){
    if(err){return next(err);}
    if(!comment){return next(new Error('Cannot find comment')); }

    req.comment = comment;
    return next();
  });
});

router.delete('/:id', auth.hasRole('admin'), function(req, res, next){
  Post.update({_id:req.comment.post}, {$pull : {'comments': req.comment.id}}, function(err, num){
    if(err) {return next(err); }
    console.log(num);
  });
  req.comment.remove(function(err, comment){
    if(err) {return next(err); }
    res.json(comment);
  });
});

// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
