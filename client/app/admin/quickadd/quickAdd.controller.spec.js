'use strict';

describe('Controller: QuickAddCtrl', function () {

  // load the controller's module
  beforeEach(module('ddblogApp'));

  var QuickAddCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuickAddCtrl = $controller('QuickAddCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
