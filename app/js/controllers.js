'use strict';

/* Controllers */

angular.module('yacy.controllers', []).
    controller('OptionsCtrl', ['$scope', '$parse', 'storage', function($scope, $parse, storage) {
      $scope.defaultOptions = {
        'options.peerAddress': 'localhost',
        'options.peerPort': 8090,
        'options.enablePeerSsl': false,
        'options.peerUsername': null,
        'options.peerPassword': null,
        'options.enableCrawlerSettings': true,
        'options.crawlingFilter': '.*',
        'options.crawlingDepth': 0,
        'options.enableDynamicUrls': false,
        'options.enableProxyCacheStoring': false,
        'options.enableRemoteIndexing': false,
        'options.enableStaticStopWordsExclusion': false,
        'options.searchType': 'standard',
        'options.contentType': 'text',
        'options.maxResult': 10,
        'options.resource': 'global',
        'options.urlMask': '.*',
        'options.enableSnippets': false,
        'options.enableSearchPageAsStartPage': false,
        'options.enableMessageNotification': false,
        'options.enableCrawlerNotification': false,
        'options.enableNewsNotification': false
      };

      $scope.init = function() {
        for (var key in this.defaultOptions)
        {
          if (!storage.has(key))
          {
            storage.set(key, this.defaultOptions[key]);
          }

          var value = storage.get(key);

          $parse(key).assign($scope, value);

          (function(key) {
            $scope.$watch(key, function(value) {
              storage.set(key, value);
            }, true);
          }(key));
        }
      };

      $scope.reset = function() {
        for (var key in this.defaultOptions)
        {
          localStorage.removeItem(key);
        }

        this.init();
      };
    }]).
    controller('BrowserActionCtrl', ['$scope', 'chrome', 'uri', function($scope, chrome, uri) {
      $scope.currentUrl = null;
      $scope.blacklistUrl = null;
      $scope.crawlUrl = null;

      $scope.init = function() {
            chrome.tabs.query(
                {'active': true, 'status': 'complete', 'highlighted': true},
                function(tabs) {
              $scope.currentUrl = tabs[0].url;
              $scope.blacklistUrl = $scope.currentUrl;
              $scope.crawlUrl = $scope.currentUrl;
                }
            );
      };

      $scope.resetCrawl = function() {
            $scope.crawlUrl = $scope.currentUrl;
      };

      $scope.submitCrawl = function() {
      };

      $scope.resetBlacklist = function() {
            $scope.blacklistUrl = $scope.currentUrl;
      };


      $scope.filterDomain = function() {
            $scope.blacklistUrl = uri.new($scope.currentUrl).hostname() + '/.*';
      };

      $scope.filterSubDomain = function() {
            $scope.blacklistUrl = '.*' + uri.new($scope.currentUrl).domain() + '/.*';
      };
    }]).
    controller('BackgroundActionCtrl', ['$scope', 'chrome', 'uri', 'api', function($scope, chrome, uri, api) {
      $scope.init = function() {
            chrome.omnibox.onInputEntered.addListener(function(query) {
          chrome.tabs.create({url: api.getSearchUrl(query)});
            });
      };
    }]);
