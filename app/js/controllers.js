'use strict';
/* Controllers */
angular.module('yacy.controllers', []).controller('OptionsCtrl', [
  '$scope',
  '$parse',
  'storage',
  function ($scope, $parse, storage) {
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
    $scope.init = function () {
      var watchModelChange = function (key) {
        $scope.$watch(key, function (value) {
          storage.set(key, value);
        }, true);
      };
      for (var key in this.defaultOptions) {
        if (!storage.has(key)) {
          storage.set(key, this.defaultOptions[key]);
        }
        var value = storage.get(key);
        $parse(key).assign($scope, value);
        watchModelChange(key);
      }
    };
    $scope.reset = function () {
      for (var key in this.defaultOptions) {
        localStorage.removeItem(key);
      }
      this.init();
    };
  }
]).controller('BrowserActionCtrl', [
  '$scope',
  'chrome',
  'uri',
  'api',
  function ($scope, chrome, uri, api) {
    $scope.currentUrl = null;
    $scope.title = null;
    $scope.blacklistUrl = null;
    $scope.blacklistName = null;
    $scope.blacklistNames = null;
    $scope.crawlUrl = null;
    $scope.crawlingStatus = null;
    $scope.init = function () {
      $scope.blacklistNames = api.getBlacklistNames();
      $scope.blacklistNames.$promise.then(function (data) {
        $scope.blacklistName = data['0'];
      });
      chrome.tabs.query({
        'active': true,
        'status': 'complete',
        'highlighted': true
      }, function (tabs) {
        $scope.title = tabs[0].title;
        $scope.currentUrl = tabs[0].url;
        $scope.blacklistUrl = $scope.currentUrl;
        $scope.crawlUrl = $scope.currentUrl;
      });
    };
    $scope.resetCrawl = function () {
      $scope.crawlUrl = $scope.currentUrl;
    };
    $scope.submitCrawl = function () {
      if ($scope.crawlUrl && $scope.title !== null) {
        $scope.crawlingStatus = api.crawl($scope.crawlUrl, $scope.title);
        return true;
      }
      return false;
    };
    $scope.resetBlacklist = function () {
      $scope.blacklistUrl = $scope.currentUrl;
    };
    $scope.submitBlacklist = function () {
      if ($scope.blacklistUrl && $scope.blacklistName) {
        api.blacklist($scope.blacklistUrl, $scope.blacklistName);
        return true;
      }
      return false;
    };
    $scope.filterDomain = function () {
      $scope.blacklistUrl = uri.new($scope.currentUrl).hostname() + '/.*';
    };
    $scope.filterSubDomain = function () {
      $scope.blacklistUrl = '.*' + uri.new($scope.currentUrl).domain() + '/.*';
    };
  }
]).controller('BackgroundActionCtrl', [
  '$scope',
  'chrome',
  'uri',
  'api',
  function ($scope, chrome, uri, api) {
    $scope.init = function () {
      chrome.omnibox.onInputEntered.addListener(function (query) {
        chrome.tabs.create({ url: api.getSearchUrl(query) });
      });
    };
  }
]);