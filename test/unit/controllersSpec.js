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

    describe('BrowserActionCtrl', function() {
        var scope,chrome;

        beforeEach(module('yacy.controllers','yacy.services'));

        beforeEach(inject(function($rootScope, $controller, $uri) {
            scope = $rootScope.$new();
            chrome = chromeMock;

            $controller('BrowserActionCtrl', {$scope: scope, $uri: $uri, $chrome: chrome});

            chrome.mock.tabs = [{active: true,
                                 "favIconUrl": "http://www.example.com/favicon.ico",
                                 "highlighted": true,
                                 "id": 16,
                                 "incognito": false,
                                 "index": 0,
                                 "pinned": false,
                                 "selected": true,
                                 "status": "complete",
                                 "title": "title page",
                                 "url": "http://www.example.com/anyurl.html",
                                 windowId: 1}];

            scope.init();
        }));

        it('should have current url', function() {
            expect(scope.blacklistUrl).toEqual("http://www.example.com/anyurl.html");
            expect(scope.crawlUrl).toEqual("http://www.example.com/anyurl.html");
        });

        it('should filter domain', function() {
            scope.filterDomain();
            expect(scope.blacklistUrl).toEqual("www.example.com/.*");
        });

        it('should filter subdomain', function() {
            scope.filterSubDomain();
            expect(scope.blacklistUrl).toEqual(".*example.com/.*");
        });

        it('should reset urls if changed', function() {
            scope.crawlUrl = "http://whatever.com";
            scope.blacklistUrl = "http://whatever.com";
            scope.resetCrawl();
            scope.resetBlacklist();
            expect(scope.crawlUrl).toEqual("http://www.example.com/anyurl.html");
            expect(scope.blacklistUrl).toEqual("http://www.example.com/anyurl.html");
        });

    });
});
