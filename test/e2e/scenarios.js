/*jshint -W117 */

'use strict';
/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
describe('yacy', function () {
  describe('options', function () {
    beforeEach(function () {
      browser.get('/templates/options.html');
    });
    it('should update values', function () {
      element(by.id('tabs_peer')).click();
      element(by.model('options.peerAddress')).clear();
      element(by.model('options.peerAddress')).sendKeys('127.0.0.1');

      element(by.model('options.peerPort')).clear();
      element(by.model('options.peerPort')).sendKeys(10000);

      element(by.id('tabs_quick_crawl')).click();
      element(by.model('options.enableDynamicUrls')).click();

      browser.get('/templates/options.html');

      element(by.id('tabs_peer')).click();
      expect(element(by.model('options.peerAddress')).getAttribute('value')).toEqual('127.0.0.1');
      expect(element(by.id('peer_port')).getAttribute('value')).toEqual('10000');

      element(by.id('tabs_quick_crawl')).click();
      expect(element(by.id('dynamic_urls')).getAttribute('checked')).toBe('true');
    });
    it('should validate values', function () {
      element(by.id('tabs_peer')).click();

      element(by.model('options.peerAddress')).clear();
      element(by.model('options.peerAddress')).sendKeys('');
      expect(element.all(by.css('#peer_address.ng-invalid')).count()).toEqual(1);

      element(by.model('options.peerAddress')).clear();
      element(by.model('options.peerAddress')).sendKeys('localhost');
      expect(element.all(by.css('#peer_address.ng-invalid')).count()).toEqual(0);

      element(by.model('options.peerPort')).clear();
      element(by.model('options.peerPort')).sendKeys('100000000');
      expect(element.all(by.css('#peer_port.ng-invalid')).count()).toEqual(1);

      element(by.model('options.peerPort')).clear();
      element(by.model('options.peerPort')).sendKeys('0');
      expect(element.all(by.css('#peer_port.ng-invalid')).count()).toEqual(1);

      element(by.model('options.peerPort')).clear();
      element(by.model('options.peerPort')).sendKeys('100');
      expect(element.all(by.css('#peer_port.ng-invalid')).count()).toEqual(0);

      element(by.id('tabs_quick_crawl')).click();

      element(by.model('options.crawlingFilter')).clear();
      element(by.model('options.crawlingFilter')).sendKeys('');
      expect(element.all(by.css('#crawling_filter.ng-invalid')).count()).toEqual(1);

      element(by.model('options.crawlingFilter')).clear();
      element(by.model('options.crawlingFilter')).sendKeys('.*');
      expect(element.all(by.css('#crawling_filter.ng-invalid')).count()).toEqual(0);

      element(by.id('tabs_search')).click();

      element(by.model('options.urlMask')).clear();
      element(by.model('options.urlMask')).sendKeys('');
      expect(element.all(by.css('#url_mask.ng-invalid')).count()).toEqual(1);

      element(by.model('options.urlMask')).clear();
      element(by.model('options.urlMask')).sendKeys('.*');
      expect(element.all(by.css('#url_mask.ng-invalid')).count()).toEqual(0);
    });
    it('should reset all values', function () {
      element(by.id('tabs_peer')).click();
      element(by.model('options.peerAddress')).clear();
      element(by.model('options.peerAddress')).sendKeys('example.com');
      element(by.model('options.peerPort')).clear();
      element(by.model('options.peerPort')).sendKeys(15);

      element(by.id('tabs_quick_crawl')).click();
      element(by.model('options.enableDynamicUrls')).click();

      element(by.id('tabs_main')).click();
      element(by.id('reset_all_settings')).click();

      element(by.id('tabs_peer')).click();
      expect(element(by.model('options.peerAddress')).getAttribute('value')).toEqual('localhost');
      expect(element(by.id('peer_port')).getAttribute('value')).toEqual('8090');

      element(by.id('tabs_quick_crawl')).click();
      expect(element(by.id('dynamic_urls')).getAttribute('checked')).toBe(null);
    });
  });
});
