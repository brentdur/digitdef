'use strict';

angular.module('ddblogApp')
  .controller('ViewCtrl', [
  '$scope',
  'posts',
  'images',
  'comments',
  '$stateParams',
  '$filter',
  function($scope, posts, images, comments, $stateParams, $filter){
    var format = {
      posts: {
        header: ['Title', 'Date', 'Tags', 'Views', 'Status', 'Actions']
      },
      images: {
        header: ['Title', 'Date', 'Tags', 'Views', 'Status', 'Actions']
      },
      comments: {
        header: ['Post', 'User', 'Date', 'Brief', 'Actions']
      }
    };
    $scope.type = $stateParams.type;
    $scope.isComment = false;
    $scope.isPost = false;
    $scope.isImg = false;
    $scope.checked = [];
    $scope.selectAll = false;
    switch($scope.type) {
      case 'posts': $scope.bucket = posts.posts;
                    $scope.inf = format.posts;
                    $scope.isPost = true;
                    break;
      case 'images': $scope.bucket = images.images;
                     $scope.inf = format.images;
                     $scope.isImg = true; break;
      case 'comments': $scope.bucket = comments.comments;
                       $scope.inf = format.comments;
                       $scope.isComment = true; break;
      case 'pages': $scope.bucket = null; break;
    }

    $scope.isPub = function(content){
      if(content && content.update && content.update.toLowerCase() === 'published') {
        return true;
      }
      return false;
    };

    $scope.toPub = function(content){
      if($scope.type === 'images'){
        images.toggleLive(content, {status:'published'});
      }
      else if($scope.type === 'posts'){
        posts.toggleLive(content, {status:'published'});
        // comments = comments.getAll();
      }

    };
    $scope.toDraft = function(content){
      if($scope.type === 'images'){
        images.toggleLive(content, {status:'draft'});
      }
      else if($scope.type === 'posts'){
        posts.toggleLive(content, {status:'draft'});
        // comments = comments.getAll();
      }
    };

    $scope.delete = function(id, multi){
      if(!multi){
        var conf = confirm("Are you sure you want to delete this content?");
        if(!conf){
          return;
        }
      }
      if ($scope.type === 'images') {
        images.delete(id).success(function(){
          $scope.bucket = images.images;
        });
      }
      else if ($scope.type === 'posts'){
        posts.delete(id).success(function(){
          $scope.bucket = posts.posts;
        });
      }
      else if ($scope.type === 'comments'){
        comments.delete(id).success(function(){
          $scope.bucket = comments.comments;
        });
      }
    };

    $scope.truncateComment = function(content) {
      if(!content){ return; }
      var sub = content.substr(0,50);
      if (sub === content) {
        return content;
      }
      return sub+ '...';
    };

    $scope.viewImg = function(index){
      var imgs = $filter('orderBy')($scope.bucket, 'views', true);
      var imgUrls = [];
          for (var x = 0; x < imgs.length ; x++) {
            if(imgs[x]){
              imgUrls.push('assets/images/'+imgs[x].full);
            }
          };
        Strip.show(imgUrls, index + 1);
    };

    $scope.checkChecked = function(item){
      if(item.selected){
        $scope.checked.push(item);
        console.log($scope.checked);
      }
      else{
        for(var i = 0; i < $scope.checked.length; i++){
          if(!$scope.checked[i].selected){
            console.log($scope.checked[i].title);
            $scope.checked.splice(i, 1);
          }
        }
      }
    };

    $scope.deleteBulk = function(){
      var conf = confirm("Are you sure you want to delete all checked items?");
      if(!conf){
        return;
      }
      for(var i = 0; i < $scope.checked.length; i++){
        $scope.delete($scope.checked[i]._id, true);
      }
      $scope.checked = [];
    };

    $scope.draftBulk = function(){
      var conf = confirm("Are you sure you want to draft all checked items?");
      if(!conf){
        return;
      }
      for(var i = 0; i < $scope.checked.length; i++){
        $scope.toDraft($scope.checked[i]);
        $scope.checked[i].selected = false;
      }
      $scope.checked = [];
    };

    $scope.pubBulk = function(){
      var conf = confirm("Are you sure you want to publish all checked items?");
      if(!conf){
        return;
      }
      for(var i = 0; i < $scope.checked.length; i++){
        $scope.toPub($scope.checked[i]);
        $scope.checked[i].selected = false;
      }
      $scope.checked = [];
    };

    $scope.selectAllCheck = function(){
      if(!$scope.selectAll) {
        for(var i = 0; i < $scope.checked.length; i++){
          $scope.checked[i].selected = false;
        }
        $scope.checked = [];
      }
      else{
        for(var i = 0; i < $scope.bucket.length; i++){
          $scope.bucket[i].selected = true;
          $scope.checked.push($scope.bucket[i]);
        }
      }
      console.log($scope.checked, $scope.bucket, $scope.selectAll);
    }

}]);
