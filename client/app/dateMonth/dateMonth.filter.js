'use strict';

angular.module('ddblogApp')
  .filter('dateMonth', function(){
  return function(input, dateNum){
    if (dateNum < 0) {
      return input;
    }
    var out = [];
    angular.forEach(input, function(post){
      if(new Date(post.date).getMonth() === dateNum){
        out.push(post);
      }
    });
    return out;
  };
});

  