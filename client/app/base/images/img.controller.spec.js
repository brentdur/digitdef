'use strict';

describe('Controller: ImgCtrl', function () {

  // load the controller's module
  beforeEach(module('ddblogApp'));

  var ImgCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ImgCtrl = $controller('ImgCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
