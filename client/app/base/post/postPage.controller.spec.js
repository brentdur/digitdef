'use strict';

describe('Controller: PostPageCtrl', function () {

  // load the controller's module
  beforeEach(module('ddblogApp'));

  var PostPageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PostPageCtrl = $controller('PostPageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
