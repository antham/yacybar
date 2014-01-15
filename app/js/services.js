'use strict';

/* Services */

angular.module('yacy.services', []).
    factory('chrome', function() {
        return chrome;
    }).
    factory('storage', function() {
        var Storage = function() {
        };

        Storage.prototype = {
            set : function(key,value)
            {
                localStorage.setItem(key,angular.toJson(value));
            },
            get : function(key)
            {
                return localStorage.getItem(key) == 'undefined' ? undefined : angular.fromJson(localStorage.getItem(key));
            },
            remove : function(key)
            {
                localStorage.removeItem(key);
            },
            has : function(key)
            {
                return localStorage.getItem(key) == null ? false : true;
            }
        }

        return new Storage();
    }).
    factory('uri', function() {
        return {
            new: function(args) {
                return new URI(args);
            }
        };

