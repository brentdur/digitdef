'use strict';

var express = require('express');

var Post = require('./post.model');
var Comment = require('../comment/comment.model');
var auth = require('../../auth/auth.service');

var router = express.Router();

/*Posts: Get all, get specific, post, delete(with comments), param */
router.get('/', auth.hasRole('admin'), function(req, res, next){
  Post.find(function(err, posts){
    if(err){ return next(err); }
    res.json(posts);
  });
});

router.get('/live', function(req, res, next){
  Post.find({'update':'published'}, function(err, posts){
    if(err) {return next(err);}
    res.json(posts);
  });
});

router.get('/:id', function(req, res, next){
  req.post.populate('comments', function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

router.get('/link/:perma', function(req, res, next){
  req.post.populate('comments', function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

router.post('/', auth.hasRole('admin'), function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

router.post('/:id/comments', auth.isAuthenticated(), function(req, res, next){
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment){
    if(err) { return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post){
      if(err) { return next(err); }
      res.json(comment);
    });
  });
});

router.post('/:id/live', auth.hasRole('admin'), function(req, res, next){
  var status = req.body;
  req.post.toggleUpdate(status, function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

router.post('/update/:id', auth.hasRole('admin'), function(req, res, next){
  Post.update({_id: req.post._id}, {
    title: req.body.title,
		date: req.body.date,
    content: req.body.content,
    tags: req.body.tags,
    update: req.body.update
  }, function(err, numberAffected){
    if(err){return next(err); }
  });
  Post.findById(req.post._id, function(err, post){
    if(err){return next(err); }
    res.json(post);
  })
});

router.put('/view/:id', function(req, res, next){
  req.post.view(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

router.delete('/:id', auth.hasRole('admin'), function(req, res, next){
  Comment.find().where('post').equals(req.post).remove(function(err, comments){
          if(err){return next(err); }
          console.log(comments);  });
  req.post.remove(function(err, post){
    if(err){ return next(err); }
    res.json(post);
  });
});

router.param('id', function(req, res, next, id){
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('Cannot find post')); }

    req.post = post;
    return next();
  });
});

router.param('perma', function(req, res, next, perma){
  var query = Post.findOne({link: ''+perma}).find(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('Cannot find post')); }

    req.post = post[0];
    return next();
  });
});

// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
