'use strict';

angular.module('ddblogApp')
  .controller('QuickAddCtrl', [
  '$scope',
  'posts',
  'images',
  '$stateParams',
  '$http',
  '$upload',
  '$location',
  '$sce',
  function($scope, posts, images, $stateParams, $http, $upload, $location, $sce){
    $scope.update = false;
    $scope.isCollapsed = true;
    $scope.isDraft = $stateParams.draft;
    var id;
    $scope.dragText = 'Drop Full Image Here';
    $scope.dragTextT ='Drop Thumbnail Image Here';
    $scope.subText = 'Post';
    if ($stateParams.type) {
      var letter = $stateParams.type.substr(0,1);
      $scope.type = $stateParams.type.substr(1);
      letter = letter.toUpperCase();
      $scope.type = letter + $scope.type;
    }

    if($stateParams.post){
      $scope.title = $stateParams.post.title;
      $scope.content = $stateParams.post.content;
      $scope.tags = $stateParams.post.tags.toString();
      id = $stateParams.post._id;
      $scope.update = true;
      $scope.subText = 'Update';
    }

    if($stateParams.img){
      $scope.alt = $stateParams.img.alt;
      $scope.full = $stateParams.img.full;
      $scope.thumbN = $stateParams.img.thumb;
      $scope.tags = $stateParams.img.tags.toString();
      id = $stateParams.img._id;
      $scope.update = true;
      $scope.views = $stateParams.img.views;
      $scope.subText = 'Update';
    }

    $scope.refreshDate = function(){
      $scope.dateTime = new Date();
    };
    $scope.refreshDate();

    $scope.send = function(type){
      if($scope.type.toLowerCase() === 'image'){
        if($scope.update){
          $scope.updateImg(type);
        }
        else {
          $scope.addImage(type, 0);
        }
      }
      else {
        if($scope.update){
          $scope.updatePost(type);
        }
        else {
          $scope.addPost(type);
        }
      }
    };

    $scope.addPost = function(type){
      if(!$scope.title || $scope.title === '') {return;}
      var sum = '';
      var cont = '';
      var tgs = [];
      if($scope.content.indexOf('[break]') != -1){
        sum = $scope.content.split('[break]')[0];
        cont = $scope.content.replace('[break]', '');
      }
      else {
        cont = $scope.content;
      }

      if($scope.tags){
        tgs = $scope.tags.split(',');
        for(var x in tgs){
          tgs[x] = tgs[x].trim();
        }
      }

      posts.create({
        title: $scope.title,
        date: $scope.dateTime,
        link: posts.posts.length + 2,
        summary: sum,
        visibleMore: true,
        view: 0,
        update: type,
        tags: tgs,
        content: cont
      });
      $scope.title = '';
      $scope.tags = '';
      $scope.content = '';
    };

    $scope.trustHtml = function(snip) {
      return $sce.trustAsHtml(snip);
    };

    $scope.updatePost = function(type) {
      if(!$scope.title || $scope.title === '') {return;}
      var tagArray;
      var sum = '';
      var cont = '';
      if($scope.content.indexOf('[break]') != -1){
        sum = $scope.content.split('[break]')[0];
        cont = $scope.content.replace('[break]', '');
      }
      else {
        cont = $scope.content;
      }

      if($scope.tags){
        tagArray = $scope.tags.split(',');
        for(var x in tagArray){
          tagArray[x] = tagArray[x].trim();
        }
      }
      else {
        tagArray = '';
      }
      posts.update(id, {
        title: $scope.title,
        date: $scope.dateTime,
        summary: sum,
        tags: tagArray,
        content: cont,
        update: type
      }).success(function(){
        if($scope.update){
          $location.path('/admin/view/posts');
        }
      });
      $scope.title = '';
      $scope.tags = '';
      $scope.content = '';
    };

    // $scope.$watch('content', function () {
    //     $scope.fixedContent
    // });

    $scope.fixedContent = function(){
      var find = ['para', 'tab'];
      var replace = ['</p><p>[tab]', '&nbsp&nbsp&nbsp&nbsp']; 
      var newContent = $scope.content;
      for(var i = 0; i<  find.length; i++){
        var re = new RegExp('\\['+find[i]+ '\\]','g');
        newContent = newContent.replace(re, replace[i]);
      }
      return newContent;
    };

    $scope.addImage = function(type, views){
      if(!$scope.alt || $scope.alt === '') { return; }
      if($scope.files) {
          $scope.upload($scope.files, $scope.full);
          $scope.dropped = null;
          $scope.files = '';
        }
      if($scope.thumb) {
          $scope.upload($scope.thumb, $scope.thumbN);
          $scope.droppedT = null;
          $scope.thumb = '';
        }
      var tagArray;
      if($scope.tags){
        tagArray = $scope.tags.split(',');
      }
      else {
        tagArray = '';
      }
      images.create({
        alt: $scope.alt,
        date: $scope.dateTime,
        full: $scope.full,
        thumb: $scope.thumbN,
        update: type,
        tags: tagArray,
        views: views
      }).success(function(){
        if($scope.update){
          $location.path('/admin/view/images');
        }
        $scope.dragText = 'Drop Full Image Here';
        $scope.dragTextT ='Drop Thumbnail Image Here';
        $scope.alt = '';
        $scope.tags = '';
        $scope.full = '';
        $scope.thumbN = '';
        $scope.files = null;
        $scope.thumb = null;
      }).error(function(data){
        var num = images.images.length*3+Math.round(Math.random()*1000);
        $scope.dragText = 'Drop Full Image Here';
        $scope.dragTextT ='Drop Thumbnail Image Here';
        $scope.full = num+'.jpg';
        $scope.thumbN = num +'.thumb.jpg';
        alert(data.error);
      });
      
    };

    $scope.$watch('files', function () {
        if($scope.files) {
          if(!$scope.update){
            $scope.full = images.images.length+1+Math.round(Math.random()*1000)+'.jpg';
          }
          $scope.dropped = {'background-color': 'lightgreen',
                            'border': 'none'};
          $scope.dragText = 'Image Added';
        }
    });

    $scope.$watch('thumb', function(){
       if($scope.thumb) {
          if(!$scope.update){
            $scope.thumbN = images.images.length+1+Math.round(Math.random()*1000)+'.thumb.jpg';
          }
          $scope.droppedT = {'background-color': 'lightgreen',
                            'border': 'none'};
          $scope.dragTextT ='Thumbnail Added';
        }
    });

    $scope.updateImg = function(type) {
      if($scope.files && $scope.thumb){
        console.log('files');
        images.delete(id).success(function(){
            $scope.addImage(type, $scope.views);
          });
      }
      else{
        var tagArray;
        if($scope.tags){
          tagArray = $scope.tags.split(',');
        }
        else {
          tagArray = '';
        }
        console.log(type);
        images.update(id, {
          alt: $scope.alt,
          date: $scope.dateTime,
          tags: tagArray,
          full: $scope.full,
          thumb: $scope.thumbN,
          update: type
        }).success(function(data){
          $location.path('/admin/view/images');
        });
        $scope.alt = '';
        $scope.tags = '';
        $scope.full = '';
        $scope.thumbN = '';
      }

    };

    $scope.upload = function (files, name) {

        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: '/photos',
                    file: file,
                    fileName: name
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' +
                                evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file uploaded.');
                });
            }
        }
    };

    $scope.delete = function(){
      var conf = confirm("Are you sure you want to delete this content?");
      if(!conf){
        return;
      }
      $scope.tags = '';
      $scope.content = '';
      $scope.title = '';
      $scope.files = '';
      $scope.thumb = '';
      $scope.full = '';
      $scope.thumbN = '';
      $scope.alt = '';
    };


}]);
