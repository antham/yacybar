'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('yacy.services', []).
    factory('$chrome', function() {
        return chrome;
    }).
    factory('$uri',function () {
        return {
            new: function (url) {
                return new URI(url);
            }
        };
    });

