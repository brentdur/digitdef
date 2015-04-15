'use strict';

describe('Directive: ImgView', function () {

  // load the directive's module
  beforeEach(module('ddblogApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-img-view></-img-view>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ImgView directive');
  }));
});