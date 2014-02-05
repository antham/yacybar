'use strict';

/* jasmine specs for services go here */

describe('service', function() {

  beforeEach(module('ngResource','yacy.services'));

  describe('storage', function() {
    var storage = null;

    beforeEach(inject(function(_storage_){
      storage = _storage_;

      storage.set("boolean",true);
      storage.set("integer",1);
      storage.set("string","hello");
      storage.set("null",null);
      storage.set("undefined",undefined);
    }));

    it('should check if value exists in localStorage', function(){
      expect(storage.has("boolean")).toEqual(true);
      expect(storage.has("integer")).toEqual(true);
      expect(storage.has("string")).toEqual(true);
      expect(storage.has("null")).toEqual(true);
      expect(storage.has("undefined")).toEqual(true);
      expect(storage.has("no existing key")).toEqual(false);
    });

    it('should retrieve value from localStorage', function(){
      expect(storage.get("boolean")).toEqual(true);
      expect(storage.get("integer")).toEqual(1);
      expect(storage.get("string")).toEqual("hello");
      expect(storage.get("null")).toEqual(null);
      expect(storage.get("undefined")).toEqual(undefined);
      expect(storage.get("no existing key")).toEqual(null);
    });

    it('should remove value from localStorage', function(){
      storage.remove("boolean");
      storage.remove("integer");
      storage.remove("string");
      storage.remove("null");
      storage.remove("undefined");
      storage.remove("no existing key");

      expect(storage.has("boolean")).toEqual(false);
      expect(storage.has("integer")).toEqual(false);
      expect(storage.has("string")).toEqual(false);
      expect(storage.has("null")).toEqual(false);
      expect(storage.has("undefined")).toEqual(false);
    });
  });

  describe('api', function() {
    var api = null;
    var $httpBackend = null;

    beforeEach(inject(function(_storage_, _$httpBackend_, _xml2json_, _api_) {
      $httpBackend = _$httpBackend_;
      api = _api_;
    }));

    describe('get blacklist names', function() {
      it('should return blacklist names', function() {

        $httpBackend.whenGET('http://localhost:8080/xml/blacklists_p.xml?attrOnly=1').respond('<?xml version="1.0" ?><blacklists><list crawler="1" dht="1" name="url.default.black" news="1" proxy="1" search="1" shared="1" surftips="1"></list><list crawler="1" dht="1" name="hello_world.black" news="1" proxy="1" search="1" shared="1" surftips="1"></list></blacklists>');

        var result = api.getBlacklistNames();
        $httpBackend.flush();

        expect(result.$resolved).toEqual(true);
        expect(result['blacklists']).toEqual(['url.default.black', 'hello_world.black']);
      });

      it('should return an empty list', function() {
        $httpBackend.whenGET('http://localhost:8080/xml/blacklists_p.xml?attrOnly=1').respond('');

        var result = api.getBlacklistNames();
        $httpBackend.flush();

        expect(result['blacklists']).toEqual([]);
      });
    });

    describe('blacklist url', function() {
      it('should blacklist an url', function() {

        $httpBackend.whenGET('http://localhost:8080/Blacklist_p.html?addBlacklistEntry=&currentBlacklist=blacklist_1&newEntry=anyurl.com%2Fwhatever%2Ftopic').respond();

        var result = api.blacklist('anyurl.com/whatever/topic', 'blacklist_1');
        $httpBackend.flush();

        expect(result.$resolved).toEqual(true);
      });

      it('should return null if no url, nor blacklist is provided', function() {

        var result = api.blacklist('', 'blacklist_1');
        expect(result).toEqual(null);

        var result = api.blacklist('anyurl.com/whatever/topic', '');
        expect(result).toEqual(null);

        var result = api.blacklist('', '');
        expect(result).toEqual(null);
      });
    });

    describe('crawl url', function() {
      it('should crawl an url', function() {

        $httpBackend.whenGET('http://localhost:8080/QuickCrawlLink_p.xml?url=http:%2F%2Ffree.fr&title=a%20title&crawlingDepth=0&localIndexing=true&xdstopw=false&storeHTCache=false&crawlingQ=false').respond('');

        var result = api.crawl('http://free.fr', 'a title');
        $httpBackend.flush();

        expect(result.$resolved).toEqual(true);
      });

      it('should return null if no url, nor title is provided', function() {

        var result = api.crawl('', 'a title');
        expect(result).toEqual(null);

        var result = api.crawl('anyurl.com/whatever/topic', '');
        expect(result).toEqual(null);

        var result = api.crawl('', '');
        expect(result).toEqual(null);
      });
    });
  });
});
