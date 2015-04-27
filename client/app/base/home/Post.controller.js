'use strict';

angular.module('ddblogApp')
  .controller('PostCtrl', [
  '$scope',
  '$window',
  'posts',
  'images',
  '$filter',
  'Auth',
  '$stateParams',
  '$sce',
  function($scope, $window, posts, images, $filter, Auth, $stateParams, $sce) {
  $scope.visiblePosts = 0;
  $scope.visibleImages = 0;
  $scope.numImages = 0;
  $scope.pageNum = 0;
  $scope.posts = posts.posts;
  $scope.images = images.images;
  $scope.dateFilt = -1;
  $scope.tagFilt = $stateParams.specTag;
  $scope.user = {};
  $scope.errors = {};
  $scope.isLoggedIn = Auth.isLoggedIn;


  $scope.predicate='date';
  $scope.reverse = true;

  $scope.postSmall = function(post) {
    if(post.summary && post.summary.length != 0) {
      post.visibleMore = true;
      return post.summary;
    }
    else if(post.content.length <= 750) {
      post.visibleMore = false;
      return post.content;
    }
    else {
      post.visibleMore = true;
      return post.content.substr(0,750) + '...';
    }
  };
  $scope.postMid = function(post) {
    console.log(post.summary);
    if(post.summary && post.summary.length != 0) {
      post.visibleMore = true;
      return post.summary;
    }
    else if(post.content.length <= 950) {
      post.visibleMore = false;
      return post.content;
    }
    else {
      post.visibleMore = true;
      return post.content.substr(0,950) + '...';
    }
  };

  $scope.adjust = function(postValue, imgValue) {
    if($scope.adjustCheck(postValue, $scope.posts, $scope.visiblePosts) && $scope.adjustCheck(imgValue, $scope.images, $scope.visibleImages)){
      return;
    }
    else {
     $scope.visiblePosts = $scope.visiblePosts + postValue;
     $scope.visibleImages = $scope.visibleImages + imgValue;
     $scope.pageNum = $scope.pageNum + (postValue/Math.abs(postValue));
   }
  };

  $scope.adjustCheck = function(value, index) {
    var set = $scope.getPosts();
    if (set === undefined) {
      return false;
    }
    if (index + value >= set.length || index + value < 0) {
      return true;
    }
    else {
      return false;
    }
  };

  $scope.numberOfImg = function(scope, win) {
    if (win.innerWidth > 996) {
      scope.numImages = 2;
    }
    else {
       scope.numImages = 3;
    }
  };

  $scope.numberOfImg($scope, $window);

  $scope.comma = function(isLast){
      if(isLast){
        return '';
      }
      return ',';
    };

    $scope.trustHtml = function(snip) {
      return $sce.trustAsHtml(snip);
    };

  $scope.extendPost = function(index) {
    var imagesAvaliable = $filter('dateMonth')($scope.images, $scope.dateFilt);
    imagesAvaliable = $filter('tag')(imagesAvaliable, $scope.tagFilt);
    if ($scope.numImages*(index+1+($scope.pageNum*5)) <= imagesAvaliable.length) {
        return true;
      }
    else if ($scope.numImages*(index+1+($scope.pageNum*5)) - imagesAvaliable.length === 1){
        return true;
      }
  };

  $scope.getPosts = function(){
    var out = $scope.posts;
    out = $filter('dateMonth')(out, $scope.dateFilt);
    out = $filter('tag')(out, $scope.tagFilt);
    return out;
  };

  $scope.isInMonth = function() {
    return false;
    // return new Date(actual).getMonth() == expected;
    // console.log(actual, expected);
  };

  $scope.dateFilter = function(date) {
    $scope.visiblePosts = 0;
    $scope.visibleImages = 0;
    $scope.pageNum = 0;
    $scope.dateFilt = date;
  };

  $scope.viewImg = function(index){
    var imgs = $filter('dateMonth')($scope.images, $scope.dateFilt);
    imgs = $filter('tag')(imgs, $scope.tagFilt);
    imgs = $filter('orderBy')(imgs, $scope.predicate, true);
    var imgUrls = [];
    var sentImgs = [];
        for (var x = $scope.pageNum*5*2; x < 10 + $scope.pageNum*5*2 ; x++) {
          if(imgs[x]){
            imgUrls.push('assets/images/'+imgs[x].full);
            sentImgs.push(imgs[x]);
          }
        };
      Strip.show(imgUrls, {
          afterPosition: function(position) {
            images.view(sentImgs[position-1]);
          }
        }, index + 1
      );
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
