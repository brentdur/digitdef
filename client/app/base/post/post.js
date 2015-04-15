'use strict';

angular.module('ddblogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('base.post', {
        url: '^/post/{perma}',
        templateUrl: 'app/base/post/post.html',
        controller: 'PostPageCtrl',
        resolve: {
          post: ['$stateParams', 'posts', function($stateParams, posts){
            return posts.getLink($stateParams.perma);
          }]
        }
      });
  });
