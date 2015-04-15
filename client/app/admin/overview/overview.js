'use strict';

angular.module('ddblogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.overview', {
        url: '/overview',
        templateUrl: 'app/admin/overview/overview.html',
        controller: 'AdminCtrl'
      });
  });
