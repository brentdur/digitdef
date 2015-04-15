'use strict';

describe('Controller: AdminNavCtrl', function () {

  // load the controller's module
  beforeEach(module('ddblogApp'));

  var AdminNavCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminNavCtrl = $controller('AdminNavCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
