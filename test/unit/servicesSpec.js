'use strict';

/* jasmine specs for services go here */

describe('service', function() {

  beforeEach(module('ngResource', 'yacy.services'));

  describe('storage', function() {
    var storage = null;

    beforeEach(inject(function(_storage_) {
      storage = _storage_;

      storage.set('boolean', true);
      storage.set('integer', 1);
      storage.set('string', 'hello');
      storage.set('null', null);
      storage.set('undefined', undefined);
    }));

    it('should check if value exists in localStorage', function() {
      expect(storage.has('boolean')).toEqual(true);
      expect(storage.has('integer')).toEqual(true);
      expect(storage.has('string')).toEqual(true);
      expect(storage.has('null')).toEqual(true);
      expect(storage.has('undefined')).toEqual(true);
      expect(storage.has('no existing key')).toEqual(false);
    });

    it('should retrieve value from localStorage', function() {
      expect(storage.get('boolean')).toEqual(true);
      expect(storage.get('integer')).toEqual(1);
      expect(storage.get('string')).toEqual('hello');
      expect(storage.get('null')).toEqual(null);
      expect(storage.get('undefined')).toEqual(undefined);
      expect(storage.get('no existing key')).toEqual(null);
    });

    it('should remove value from localStorage', function() {
      storage.remove('boolean');
      storage.remove('integer');
      storage.remove('string');
      storage.remove('null');
      storage.remove('undefined');
      storage.remove('no existing key');

      expect(storage.has('boolean')).toEqual(false);
      expect(storage.has('integer')).toEqual(false);
      expect(storage.has('string')).toEqual(false);
      expect(storage.has('null')).toEqual(false);
      expect(storage.has('undefined')).toEqual(false);
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

        $httpBackend.whenGET('http://localhost:8090/xml/blacklists_p.xml?attrOnly=1').respond('<?xml version="1.0" ?><blacklists><list crawler="1" dht="1" name="url.default.black" news="1" proxy="1" search="1" shared="1" surftips="1"></list><list crawler="1" dht="1" name="hello_world.black" news="1" proxy="1" search="1" shared="1" surftips="1"></list></blacklists>');

        var result = api.getBlacklistNames();
        $httpBackend.flush();

        expect(result.$resolved).toEqual(true);
        expect(result['0']).toEqual('url.default.black');
        expect(result['1']).toEqual('hello_world.black');
      });

      it('should return no result', function() {
        $httpBackend.whenGET('http://localhost:8090/xml/blacklists_p.xml?attrOnly=1').respond('');

        var result = api.getBlacklistNames();
        $httpBackend.flush();

        expect(result['0']).toEqual(undefined);
      });
    });

    describe('blacklist url', function() {
      it('should blacklist an url', function() {

        $httpBackend.whenGET('http://localhost:8090/Blacklist_p.html?addBlacklistEntry=&currentBlacklist=blacklist_1&newEntry=anyurl.com%2Fwhatever%2Ftopic').respond();

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
      it('should add an url to crawl', function() {

        $httpBackend.whenGET('http://localhost:8090/QuickCrawlLink_p.xml?url=http:%2F%2Ffree.fr&title=a%20title&crawlingDepth=0&localIndexing=true&xdstopw=false&storeHTCache=false&crawlingQ=false').respond('<?xml version= "1.0" ?><QuickCrawlLink>    <title/>    <url>str.fr</url>    <status code="0">URL successfully added to Crawler Queue        </status></QuickCrawlLink>');

        var result = api.crawl('http://free.fr', 'a title');
        $httpBackend.flush();

        expect(result.$resolved).toEqual(true);
        expect(result['code']).toEqual(0);
        expect(result['message']).toEqual('URL successfully added to Crawler Queue');
      });

      it('should add an url to crawl and status message with accent has to be parsed correctly', function() {
        $httpBackend.whenGET('http://localhost:8090/QuickCrawlLink_p.xml?url=http:%2F%2Fexample.com&title=%C3%A9%C3%A8%C3%A4%C3%A0%C3%AA%C3%AB&crawlingDepth=0&localIndexing=true&xdstopw=false&storeHTCache=false&crawlingQ=false').respond('<?xml version= "1.0" ?><QuickCrawlLink> <title>&eacute;&egrave;&auml;&agrave;&ecirc;&euml;    <title/>    <url>http://www.example.com</url>    <status code="0">URL successfully added to Crawler Queue        </status></QuickCrawlLink>');

        var result = api.crawl('http://example.com', 'éèäàêë');
        $httpBackend.flush();

        expect(result.$resolved).toEqual(true);
        expect(result['code']).toEqual(0);
        expect(result['message']).toEqual('URL successfully added to Crawler Queue');
      });

    });

    it('should return null if no url, nor title is provided', function() {

      var result = api.crawl('', 'a title');
      expect(result).toEqual(null);

      var result = api.crawl('anyurl.com/whatever/topic', '');
      expect(result).toEqual(null);

      var result = api.crawl('', '');
      expect(result).toEqual(null);
    });

    it('should parse error status message', function() {

      $httpBackend.whenGET('http://localhost:8090/QuickCrawlLink_p.xml?url=http:%2F%2Fstrfr&title=a%20title&crawlingDepth=0&localIndexing=true&xdstopw=false&storeHTCache=false&crawlingQ=false').respond('<?xml version= "1.0" ?><QuickCrawlLink>    <title/>    <url>strfr</url>    <status code="3">Unable to add URL to crawler queue: denied_ (the host \'strfr\' is local, but local addresses are not accepted: 192.168.31.254)        </status></QuickCrawlLink>');

      var result = api.crawl('http://strfr', 'a title');
      $httpBackend.flush();

      expect(result.$resolved).toEqual(true);
      expect(result['code']).toEqual(3);
      expect(result['message']).toEqual("Unable to add URL to crawler queue: denied_ (the host 'strfr' is local, but local addresses are not accepted: 192.168.31.254)");
    });

    describe('get search url', function() {
      it('should return null if no query is provided', function() {
        var result = api.getSearchUrl();
        expect(result).toEqual(null);
      });

      it('should return a search url', function() {
        var result = api.getSearchUrl('hello world');
        expect(result).toEqual('http://localhost:8090/yacysearch.html?search=hello+world&urlMaskFilter=.%2A&contentdom=text&count=10&resource=global&verify=false');
      });
    });
  });
});
