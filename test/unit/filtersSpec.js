'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {
    beforeEach(module('yacy.filters'));


    describe('translate', function() {
        beforeEach(module(function($provide) {
        }));

        it('should keep data', inject(function(translateFilter) {
            expect(translateFilter('data')).toEqual('data');
        }));

        it('should provides no string', inject(function(translateFilter) {
            expect(translateFilter('')).toEqual('');
        }));

        it('should provides replacement for key', inject(function(translateFilter) {
            chrome.i18n.datas['key_to_replace'] = "text translated";

            expect(translateFilter('key_to_replace')).toEqual('text translated');
        }));
    });
});
