'use strict';

/* Controllers */

angular.module('yacy.controllers', []).
    controller('OptionsCtrl', ['$scope', '$store', function ($scope, $store) {
        $scope.defaultOptions = {
            "peerAddress": "localhost",
            "peerPort": 8080,
            "enablePeerSsl": false,
            "peerUsername": null,
            "peerPassword": null,
            "enableCrawlerSettings": true,
            "crawlingFilter": ".*",
            "crawlingDepth": 0,
            "enableDynamicUrls": false,
            "enableProxyCacheStoring": false,
            "enableRemoteIndexing": false,
            "enableStaticStopWordsExclusion": false,
            "searchType": "standard",
            "contentType": "text",
            "maxResult": 10,
            "resource": "global",
            "urlMask": ".*",
            "enableSnippets": false,
            "enableSearchPageAsStartPage": false,
            "enableMessageNotification": false,
            "enableCrawlerNotification": false,
            "enableNewsNotification": false
        },

        $scope.init = function() {
            for(var key in this.defaultOptions)
            {
                $store.bind($scope,"options."+key,this.defaultOptions[key]);
            }
        },

        $scope.reset = function() {
            for(var key in this.defaultOptions)
            {
                $store.remove("options."+key);
            }

            this.init();
        };
    }]).
    controller('BrowserActionCtrl', ['$scope', 'chrome', 'uri', function ($scope, chrome, uri) {
        $scope.currentUrl = null;
        $scope.blacklistUrl = null;
        $scope.crawlUrl = null;

        $scope.init = function() {
            chrome.tabs.query(
                {'active':true,'status':'complete','highlighted':true},
                function (tabs) {
                    $scope.currentUrl = tabs[0].url;
                    $scope.blacklistUrl = $scope.currentUrl;
                    $scope.crawlUrl = $scope.currentUrl;
                }
            );
        };

        $scope.resetCrawl = function () {
            $scope.crawlUrl = $scope.currentUrl;
        };

        $scope.submitCrawl = function () {
        };

        $scope.resetBlacklist = function() {
            $scope.blacklistUrl = $scope.currentUrl;
        };


        $scope.filterDomain = function () {
            $scope.blacklistUrl = uri.new($scope.currentUrl).hostname()+"/.*";
        };

        $scope.filterSubDomain = function () {
            $scope.blacklistUrl = ".*"+uri.new($scope.currentUrl).domain()+"/.*";
        };
    }]);
