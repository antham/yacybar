/*global chromeMock:false */
'use strict';
describe('filter', function () {
  beforeEach(function () {
    module('yacy.filters', function ($provide) {
      $provide.value('chrome', chromeMock);
    });
  });
  it('should keep data', inject(function (translateFilter) {
    expect(translateFilter('data')).toEqual('data');
  }));
  it('should provides no string', inject(function (translateFilter) {
    expect(translateFilter('')).toEqual('');
  }));
  it('should provides replacement for key', inject(function (translateFilter) {
    chromeMock.mock.i18n.key = 'text translated';
    expect(translateFilter('key')).toEqual('text translated');
  }));
});