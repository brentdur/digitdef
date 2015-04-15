'use strict';

describe('Controller: LogInCtrl', function () {

  // load the controller's module
  beforeEach(module('ddblogApp'));

  var LogInCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LogInCtrl = $controller('LogInCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
