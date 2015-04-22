'use strict';

angular.module('ddblogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.quickAdd', {
        url: '/quick/{type}',
        templateUrl: 'app/admin/quickadd/quickadd.html',
        controller: 'QuickAddCtrl',
        params: {
          post: null,
          draft: false
        }
      });
  });
