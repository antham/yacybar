'use strict';

/* Filters */

angular.module('yacy.filters', []).
    /**
     * Translate a field using chrome extension api
     *
     * @param {String} text  A field to translate
     *
     * @return {String}      Translated field
     */
    filter('translate', ['chrome', function(chrome) {
      return function(text) {
        return text && chrome.i18n.getMessage(text) !== '' ? chrome.i18n.getMessage(text) : text;
      };
    }]);
