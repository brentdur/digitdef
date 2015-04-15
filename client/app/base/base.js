'use strict';

angular.module('ddblogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('base', {
        url: '/base',
        abstract: true,
        templateUrl: 'app/base/base.html',
        controller: 'BaseCtrl',
        resolve: {
          postPromise: ['posts', function(posts){
            return posts.getLive();
          }],
          imagePromise: ['images', function(images){
            return images.getLive();
          }]
        }
      });
  });
