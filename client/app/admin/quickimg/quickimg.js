'use strict';

angular.module('ddblogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.quickImg', {
        url: '/quickImg',
        templateUrl: 'app/admin/quickimg/quickimg.html',
        controller: 'QuickAddCtrl',
        params: {
          type: 'image',
          img: null,
          draft: false
        }
      });
  });
