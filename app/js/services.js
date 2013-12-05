'use strict';

/* Services */

angular.module('yacy.services', []).
    factory('chrome', function() {
        return chrome;
    }).
    factory('uri', function() {
        return {
            new: function(args) {
                return new URI(args);
            }
        };

