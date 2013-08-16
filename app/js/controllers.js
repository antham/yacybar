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
    }]);
