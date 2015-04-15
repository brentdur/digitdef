'use strict';

describe('Filter: dateMonth', function () {

  // load the filter's module
  beforeEach(module('ddblogApp'));

  // initialize a new instance of the filter before each test
  var dateMonth;
  beforeEach(inject(function ($filter) {
    dateMonth = $filter('dateMonth');
  }));

  it('should return the input prefixed with "dateMonth filter:"', function () {
    var text = 'angularjs';
    expect(dateMonth(text)).toBe('dateMonth filter: ' + text);
  });

});
