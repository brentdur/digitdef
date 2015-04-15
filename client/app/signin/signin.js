'use strict';

angular.module('ddblogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/signin/signin.html',
        controller: 'LogInCtrl',
      });
  });
