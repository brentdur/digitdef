'use strict';

angular.module('ddblogApp')
  .controller('PostPageCtrl', [
  '$scope',
  '$stateParams',
  'post',
  'comments',
  'posts',
  'Auth',
  '$sce',
  function($scope, $stateParams, post, comments, posts, Auth, $sce){
    $scope.post = post;
    $scope.isLoggedIn = Auth.isLoggedIn;

    posts.view(post);

    $scope.full = function(post){
      return post.content;
    };
    $scope.comma = function(isLast){
      if(isLast){
        return '';
      }
      return ',';
    };

    $scope.addComment = function(){
      if(!$scope.content || $scope.content === ''){ return; }
      comments.create($scope.post._id, {
        content: $scope.content,
        author: Auth.getCurrentUser().name,
        date: $scope.dateTime,
      }).success(function(comment){
        $scope.post.comments.push(comment);
        $scope.content = '';
      });
    };

    $scope.refreshDate = function(){
      $scope.dateTime = new Date();
    };
    $scope.refreshDate();

    $scope.trustHtml = function(snip) {
      return $sce.trustAsHtml(snip);
    }; 

    $scope.login = function(form) {
        $scope.submitted = true;

        if(form.$valid){
          Auth.login({
            email: $scope.user.email,
            password: $scope.user.password
          })
        .then( function() {
          // Account created, redirect to home

        })
          .catch(function(err) {
            $scope.errors.other = err.message;
          });
        }
      };

  }]);
