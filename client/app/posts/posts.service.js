'use strict';

angular.module('ddblogApp')
  .factory('posts', ['$http', function($http){
  var o = {
    posts: []
  };
  o.getAll = function() {
    return $http.get('/api/posts').success(function(data){
      angular.copy(data, o.posts);
    });
  };
  o.getLive = function() {
    return $http.get('/api/posts/live').success(function(data){
      angular.copy(data, o.posts);
    });
  };
  o.get = function(id) {
    return $http.get('/api/posts/'+ id).then(function(res){
      return res.data;
    });
  };
  o.getLink = function(link) {
    return $http.get('/api/posts/link/' + link).then(function(res){
      if(res.data.update === 'draft') {
        return null;
      }
      return res.data;
    });
  };
  o.update = function(id, post){
    return $http.post('/api/posts/update/'+ id, post).success(function(data){
      o.posts = o.posts.filter(function(item){
        return item._id !== id;
      });
      o.posts.push(data);
    });
  };
  o.create = function(post){
    return $http.post('/api/posts', post).success(function(data){
      o.posts.push(data);
    });
  };
  o.toggleLive = function(post, status){
    return $http.post('/api/posts/' + post._id + '/live', status).success(function(){
      post.update = status.status;
    });
  };
  o.view = function(post){
    return $http.put('/api/posts/view/' + post._id, null).success(function(){
      post.views += 1;
    });
  };
  o.delete = function(id){
    return $http.delete('/api/posts/' + id).success(function(){
      o.posts = o.posts.filter(function(item){
        return item._id !== id;
      });
      return true;
    });
  };
  return o;
}]);
