'use strict';

angular.module('ddblogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.view', {
        url: '/view/{type}',
        templateUrl: 'app/admin/view/view.html',
        controller: 'ViewCtrl'
      });
  });
