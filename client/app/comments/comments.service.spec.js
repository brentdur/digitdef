'use strict';

describe('Service: comments', function () {

  // load the service's module
  beforeEach(module('ddblogApp'));

  // instantiate service
  var comments;
  beforeEach(inject(function (_comments_) {
    comments = _comments_;
  }));

  it('should do something', function () {
    expect(!!comments).toBe(true);
  });

});
