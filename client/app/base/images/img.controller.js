'use strict';

angular.module('ddblogApp')
  .controller('ImgCtrl', [
  '$scope',
  'images',
  '$filter',
  function($scope, images, $filter){
    $scope.images = images.images;


    $scope.viewImg = function(index){
      var imgs = $filter('orderBy')($scope.images, 'date', true);
      var imgUrls = [];
      var sentImgs = [];
          for (var x = 0; x < imgs.length ; x++) {
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

}]);
