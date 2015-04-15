'use strict';

angular.module('ddblogApp')
   .factory('comments', ['$http', function($http){
  var o = {
    comments: []
  };
  o.getAll = function() {
    return $http.get('/api/comments').success(function(data) {
      angular.copy(data, o.comments);
    });
  };
  o.create = function(id, comment){
    return $http.post('/api/posts/'+ id + '/comments', comment).success(function(data){
      o.comments.push(data);
    });
  };
   o.delete = function(id){
    return $http.delete('/api/comments/' + id).success(function(){
      o.comments = o.comments.filter(function(item){
        return item._id !== id;
      });
      return true;
    });
  };
  return o;
}]);
