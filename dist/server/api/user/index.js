'use strict';

var express = require('express');
// var controller = require('./user.controller');
var User = require('./user.model');
var passport = require('passport');
var auth = require('../../auth/auth.service');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var router = express.Router();

var validationError = function(res, err) {
  return res.json(422, err);
};

router.get('/', auth.hasRole('admin'), function(req, res, next) {
  User.find(function(err, users){
    if(err){ return next(err); }
    res.json(users);
  });
});

router.get('/me', auth.isAuthenticated(), function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
});

router.post('/', function(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if(err) return validationError(res, err);
    var token = jwt.sign({_id: user._id}, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({token: token});
  });
});

router.put('/:id/password', auth.isAuthenticated(), function(req, res, next){
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function(err, user){
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err){
        if(err) return validationError(res,err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
});

module.exports = router;
