'use strict';

angular.module('ddblogApp')
  .controller('AdminNavCtrl', [
  '$scope',
  '$state',
  '$rootScope',
  'Auth',
  function($scope, $state, $rootScope, Auth){
    $rootScope.bodyId = 'admin';
    $scope.getCurrentUser = Auth.getCurrentUser();
    $scope.quickGo = function(where){
      if(where === 'img') { $state.go('^.quickImg'); }
      else { $state.go('^.quickAdd', {'type': where}); }
    };

    $rootScope.$on('$stateChangeSuccess', function() {
       document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

    $scope.logout = function() {
      Auth.logout();
      $state.go('base.home');
    };
  }]);
