'use strict';

angular.module('ddblogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('base.home', {
        url: '^/home',
        templateUrl: 'app/base/home/home.html',
        controller: 'PostCtrl',
        params: {
          specTag: ''
        }
      });
  });
