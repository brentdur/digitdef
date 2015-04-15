'use strict';

angular.module('ddblogApp')
  .filter('tag', function () {
    return function(input, tag){
    if (!tag || tag === '') {
      return input;
    }
    var out = [];
    angular.forEach(input, function(post){
      if(post.tags.indexOf(tag) != -1){
        out.push(post);
      }
    });
    return out;
  };
});