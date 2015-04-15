/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var busboy = require("connect-busboy");
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation

module.exports = function(app) {

  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/api/images', require('./api/image'));
  app.use('/api/comments', require('./api/comment'));
  app.use('/api/posts', require('./api/post'));
  app.use(busboy());

  app.use('/auth', require('./auth'));


  app.post('/photos', function (req, res, next) {
  	var dir = path.resolve(__dirname, '..', 'client/assets/images/');
  	if (!fs.existsSync(dir)) {
  		dir = path.resolve(__dirname, '..', 'public/assets/images/');
  	}
      console.log(dir);
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            if(fs.existsSync(dir +'/'+ filename)){
              return next("File name taken...");
            }
            fstream = fs.createWriteStream(dir +'/'+ filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                console.log("Upload Finished of " + filename);
                res.redirect('back');           //where to go next
            });
        });
    });
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
