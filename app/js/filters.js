'use strict';
/* Filters */
angular.module('yacy.filters', []).filter('translate', [
  'chrome',
  function (chrome) {
    return function (text) {
      return text && chrome.i18n.getMessage(text) !== '' ? chrome.i18n.getMessage(text) : text;
    };
  }
]);