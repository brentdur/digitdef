'use strict';

var express = require('express');

var Image = require('./image.model');
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
var auth = require('../../auth/auth.service');

var router = express.Router();
var dir = path.resolve(__dirname, '../../..', 'client/assets/images/');
if (!fs.existsSync(dir)) {
	dir = path.resolve(__dirname, '../../..', 'public/assets/images/');
}


router.get('/', auth.hasRole('admin'), function(req, res, next){
  Image.find(function(err, images){
    if(err){ return next(err); }
    res.json(images);
  });
});

router.get('/live', function(req, res, next){
  Image.find({'update':'published'}, function(err, images){
    if(err) {return next(err);}
    res.json(images);
  });
});

router.post('/', auth.hasRole('admin'), function(req, res, next){
  var image = new Image(req.body);

  Image.find({$or: [ {'full':image.full},{'thumb':image.thumb} ]}, function(err, images){
    if(err) {return next(err);}
    if(images.length > 0){
      res.status(500).json({ error: 'File already exists' })
    }
    else {
     image.save(function(err, image){
       if(err){ return next(err); }
       res.json(image);
     }); 
    }
  });

  
});

router.post('/:id/live', auth.hasRole('admin'), function(req, res, next){
  var status = req.body;
  console.log(status);
  req.image.toggleUpdate(status, function(err, image){
    if (err) { return next(err); }

    res.json(image);
  });
});

router.post('/update/:id', auth.hasRole('admin'), function(req, res, next){
  Image.update({_id: req.image._id}, {
    alt: req.body.alt,
		date: req.body.date,
    full: req.body.full,
    thumb: req.body.thumb,
    tags: req.body.tags,
    update: req.body.update
  }, function(err, numberAffected){
    if(err){return next(err); }
  });
  Image.findById(req.image._id, function(err, image){
    if(err){return next(err); }
    res.json(image);
  })
});

router.put('/view/:id', function(req, res, next){
  req.image.view(function(err, image){
    if (err) { return next(err); }

    res.json(image);
  });
});


router.param('id', function(req, res, next, id){
  var query = Image.findById(id);

  query.exec(function (err, image){
    if (err) { return next(err); }
    if (!image) { return next(new Error('Cannot find image')); }

    req.image = image;
    return next();
  });
});

router.delete('/:id', auth.hasRole('admin'), function(req, res, next){
  req.image.remove(function(err, image){
    if (err) {return next(err); }
    var basePath = dir + '/';
    fs.exists(basePath+image.full, function (exists) {
      if(exists){
        fs.unlinkSync(basePath+image.full);
      }
    });
    fs.exists(basePath+image.thumb, function (exists) {
      if(exists){
        fs.unlinkSync(basePath+image.thumb);
      }
    });
    res.json(image);
  });
});

// exports.deletePhoto = function (req, res) {
//   Photos.remove({_id: req.params.id}, function(err, photo) {
//     if(err) {
//        return res.send({status: "200", response: "fail"});
//     }
//     fs.unlink(photo.path, function() {
//       res.send ({
//         status: "200",
//         responseType: "string",
//         response: "success"
//       });
//     });
//  });
// };

// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
