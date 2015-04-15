'use strict';

angular.module('ddblogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminNavCtrl',
        resolve: {
          postPromise: ['posts', function(posts){
            return posts.getAll();
          }],
          imagePromise: ['images', function(images){
            return images.getAll();
          }],
          commentsPromise: ['comments', function(comments){
            return comments.getAll();
          }]
        }
      });
  });
