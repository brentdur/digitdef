'use strict';

angular.module('ddblogApp')
  .factory('images', ['$http', function($http){
  var o = {
    images: []
  };
  o.getAll = function() {
    return $http.get('/api/images').success(function(data) {
      angular.copy(data, o.images);
    });
  };
  o.getLive = function() {
    return $http.get('/api/images/live').success(function(data){
      angular.copy(data, o.images);
    });
  };
  o.create = function(images){
    return $http.post('/api/images', images).success(function(data){
      o.images.push(data);
    });
  };
  o.update = function(id, image){
    return $http.post('/api/images/update/'+ id, image).success(function(data){
      o.images = o.images.filter(function(item){
        return item._id !== id;
      });
      o.images.push(data);
    });
  };
  o.toggleLive = function(image, status){
    return $http.post('api/images/' + image._id + '/live', status).success(function(){
      image.update = status.status;
    });
  };
  o.view = function(image){
    return $http.put('/api/images/view/' + image._id, null).success(function(){
      image.views += 1;
    });
  };
  o.delete = function(id){
    return $http.delete('/api/images/' + id).success(function(){
      o.images = o.images.filter(function(item){
        return item._id !== id;
      });
      return true;
    });
  };
  return o;
}]);
