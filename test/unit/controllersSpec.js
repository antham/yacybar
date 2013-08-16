'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function () {

    describe('OptionsCtrl', function() {
        beforeEach(module('yacy.controllers','localStorage'));

        var scope, store, ctrl;

        beforeEach(inject(function($rootScope, $controller, $store) {
            scope = $rootScope.$new();
            store = $store;

            var ctrl = $controller('OptionsCtrl', {$scope: scope, $store: $store});
        }));

        it('should initialize all options in localStorage with their defaults values', function() {
            scope.init();

            expect(store.get('options.peerAddress')).toEqual('localhost');
            expect(store.get('options.peerPort')).toEqual(8080);
            expect(store.get('options.enableDynamicUrls')).toEqual(false);
        });

        it('should reset all options in localStorage with their defaults values', function() {
            store.set('options.peerAddress','127.0.0.1');
            store.set('options.peerPort',10000);
            store.set('options.enableDynamicUrls',true);

            scope.reset();

            expect(store.get('options.peerAddress')).toEqual('localhost');
            expect(store.get('options.peerPort')).toEqual(8080);
            expect(store.get('options.enableDynamicUrls')).toEqual(false);
        });
    });
});
