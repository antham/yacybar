/**
 * Chrome mock
 */

var chromeMock = {

  mock: {
    i18n: {},
    tabs: {}
  },

  i18n: {
    getMessage: function(text) {
      return chromeMock.mock.i18n[text] ? chromeMock.mock.i18n[text] : text;
    }
  },

  tabs: {
    query: function(queryInfo, callback) {
      callback(chromeMock.mock.tabs);
    }
  }
};
