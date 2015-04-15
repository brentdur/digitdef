'use strict';

angular.module('ddblogApp')
  .controller('AdminCtrl', [
  '$scope',
  'posts',
  'images',
  'comments',
  '$state',
  '$filter',
  function($scope, posts, images, comments, $state, $filter){
    $scope.posts = posts.posts;
    $scope.images = images.images;
    $scope.comments = comments.comments;

    $scope.goTo = function(where){
      $state.go('admin.view', {'type':where});
    };

    $scope.viewImg = function(image){
      $location.path('assets/images/' + image.full);
      images.view(image);
    };

    $scope.viewImg = function(index){
      var imgs = $filter('orderBy')($scope.images, 'views', true);
      var imgUrls = [];
          for (var x = 0; x < imgs.length ; x++) {
            if(imgs[x]){
              imgUrls.push('assets/images/'+imgs[x].full);
            }
          };
        Strip.show(imgUrls, index + 1);
    };

}]);
