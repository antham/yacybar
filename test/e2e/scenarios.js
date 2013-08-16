'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('yacy', function() {
    describe('options', function() {
        beforeEach(function() {
            browser().navigateTo('/app/options.html');
        });

        it('should update values', function() {
            input('options.peerAddress').enter('127.0.0.1');
            input('options.peerPort').enter(10000);
            input('options.enableDynamicUrls').check();

            expect(element('input[name~=peer_address]').val()).toEqual('127.0.0.1');
            expect(element('input[name~=peer_port]').val()).toEqual("10000");
            expect(element('input[name~=dynamic_urls]').attr('checked')).toBeTruthy();
        });

        it('should validate values', function() {
            input('options.peerAddress').enter('');
            expect(element('input[name~=peer_address].ng-invalid').count()).toBe(1);

            input('options.peerPort').enter('1000000');
            expect(element('input[name~=peer_address].ng-invalid').count()).toBe(1);

            input('options.peerPort').enter('0');
            expect(element('input[name~=peer_address].ng-invalid').count()).toBe(1);

            input('options.peerPort').enter('word');
            expect(element('input[name~=peer_address].ng-invalid').count()).toBe(1);

            input('options.crawlingFilter').enter('');
            expect(element('input[name~=crawling_filter].ng-invalid').count()).toBe(1);

            input('options.urlMask').enter('');
            expect(element('input[name~=url_mask].ng-invalid').count()).toBe(1);
        });

        it('should reset all values', function() {
            input('options.peerAddress').enter('example.com');
            input('options.peerPort').enter(15);
            input('options.enableDynamicUrls').check();

            element('button[name~=reset_all_settings]').click();

            expect(element('input[name~=peer_address]').val()).toEqual('localhost');
            expect(element('input[name~=peer_port]').val()).toEqual('8080');
            expect(element('input[name~=dynamic_urls]').attr('checked')).toBeFalsy();
        });
    });
});
