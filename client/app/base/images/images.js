'use strict';

angular.module('ddblogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('base.images', {
        url: '^/images',
        templateUrl: 'app/base/images/images.html',
        controller: 'ImgCtrl'
      });
  });
