'use strict';

angular.module('ddblogApp')
  .controller('LogInCtrl',[
    '$scope',
    '$rootScope',
    'Auth',
    '$location',
    function ($scope, $rootScope, Auth, $location) {
      $rootScope.bodyId = 'form';
      $scope.user = {};
      $scope.errors = {};

      $scope.login = function(form) {
        $scope.submitted = true;

        if(form.$valid){
          Auth.login({
            email: $scope.user.email,
            password: $scope.user.password
          })
          .then(function(){
            $location.path('/admin/overview');
          })
          .catch(function(err) {
            $scope.errors.other = err.message;
          });
        }
      };
  }]);
