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
        set: function(key, value)
        {
          localStorage.setItem(key, angular.toJson(value));
        },
        get: function(key)
        {
          return localStorage.getItem(key) == 'undefined' ? undefined : angular.fromJson(localStorage.getItem(key));
        },
        remove: function(key)
        {
          localStorage.removeItem(key);
        },
        has: function(key)
        {
          return localStorage.getItem(key) == null ? false : true;
        }
      };

      return new Storage();
    }).
    factory('uri', function() {
      return {
        new: function(args) {
          return new URI(args);
        }
      };
    }).
    factory('xml2json', function() {
      return {
        new: function() {
          return new X2JS();
        }
      };
    }).
    factory('api', ['$resource', 'storage', 'xml2json', 'uri',
                  function($resource, storage, xml2json, uri) {
                    var Api = function($resource, storage, xml2json, uri) {
                      this.$resource = $resource;
                      this.storage = storage;
                      this.xml2json = xml2json.new();
                      this.uri = uri;

                      this.params = {
                        'protocol': storage.get('options.enablePeerSsl') ? 'https' : 'http',
                        'hostname': storage.get('options.peerAddress'),
                        'port': storage.get('options.peerPort') ? storage.get('options.peerPort') : ''
                      };
                    };

                    Api.prototype = {

                      getSearchUrl: function(query)
                      {
                        if (!query)
                        {
                          return null;
                        }

                        var uri = this.uri.new(this.params);
                        uri.path('yacysearch.html');

                        var params = {};
                        params['search'] = query;
                        params['urlMaskFilter'] = storage.get('options.urlMask');
                        params['contentdom'] = storage.get('options.contentType');
                        params['count'] = storage.get('options.maxResult');
                        params['resource'] = storage.get('options.resource');
                        params['verify'] = storage.get('options.enableSnippets');

                        uri.search(params);

                        return uri.toString();
                      },

                      crawl: function(url, title)
                      {
                        if (!url || !title)
                        {
                          return null;
                        }

                        var params = this.params;
                        var xml2json = this.xml2json;
                        params['url'] = url;
                        params['title'] = title;
                        params['crawlingDepth'] = storage.get('options.crawlingDepth');
                        params['localIndexing'] = !storage.get('options.enableRemoteIndexing');
                        params['xdstopw'] = storage.get('options.enableStaticStopWordsExclusion');
                        params['storeHTCache'] = storage.get('options.enableProxyCacheStoring');
                        params['crawlingQ'] = storage.get('options.enableDynamicUrls');

                        return this.$resource(':protocol://:hostname' + ':' + ':port/QuickCrawlLink_p.xml?url=:url&title=:title&crawlingDepth=:crawlingDepth&localIndexing=:localIndexing&xdstopw=:xdstopw&storeHTCache=:storeHTCache&crawlingQ=:crawlingQ', params,
                                              {
                                                get:
                                                {
                                                  method: 'GET',
                                                  transformResponse:
                                                  function(data, headersGetter) {
                                                    var response = {};

                                                    var extractedMessage = /<status\s*code="(\d*)">((?:.|[\s\S])+?)<\/status>/gm.exec(data);

                                                    response['code'] = !extractedMessage || typeof extractedMessage[1] == undefined ? -1 : parseInt(extractedMessage[1].trim());
                                                    response['message'] = !extractedMessage || typeof extractedMessage[2] == undefined ? 'Request failed' : extractedMessage[2].trim();

                                                    return response;
                                                  }
                                                }
                                              }).get();
                      },

                      blacklist: function(url, name)
                      {
                        if (!url || !name)
                        {
                          return null;
                        }

                        var params = this.params;
                        params['currentBlacklist'] = name;
                        params['newEntry'] = url;

                        return this.$resource(':protocol://:hostname' + ':' + ':port/Blacklist_p.html?addBlacklistEntry=&currentBlacklist=:currentBlacklist&newEntry=:newEntry', params).get();

                      },

                      getBlacklistNames: function()
                      {
                        var params = this.params;
                        var xml2json = this.xml2json;

                        return this.$resource(':protocol://:hostname' + ':' + ':port/xml/blacklists_p.xml?attrOnly=1',
                                              params,
                                              {get:
                                               {
                                                 method: 'GET',
                                                 transformResponse:
                                                 function(data, headersGetter) {
                                                   var response = {};

                                                   try
                                                   {
                                                     var jsonData = xml2json.xml_str2json(data);
                                                     var list = jsonData['blacklists']['list'];

                                                     for (var i = 0; i < list.length; i++)
                                                     {
                                                       response[i] = list[i]['_name'];
                                                     }
                                                   }
                                                   catch (e)
                                                   {
                                                   }

                                                   return response;
                                                 }
                                               }
                                              }).get();
                      }
                    };

                    return new Api($resource, storage, xml2json, uri);
                  }]);
