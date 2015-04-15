'use strict';

angular.module('ddblogApp')
  .controller('BaseCtrl',[
    '$scope',
    '$rootScope',
    'Auth',
    '$state',
    function ($scope, $rootScope, Auth, $state) {
    $rootScope.bodyId = '';
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;

    $scope.adminLink = function(){
      if(!$scope.isLoggedIn()) {
        return true;
      }
      if($scope.isAdmin()){
        return true;
      }
      return false;
    }

    $scope.logOn = function() {
      Auth.isLoggedInAsync(function(logged){
        if(logged){
          $state.go('admin.overview');
        }
        else {
          $state.go('signin');
        }
      });
    };

    $rootScope.$on('$stateChangeSuccess', function() {
       document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

    $scope.logout = function() {
      Auth.logout();
      $scope.isLoggedIn = Auth.isLoggedIn;
    };

}]);
