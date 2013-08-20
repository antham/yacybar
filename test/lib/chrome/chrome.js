/**
 * Chrome mock
 */

var chromeMock = {tabs: {},i18n: {},mock: {i18n: {},tabs: {}}};

chromeMock.i18n.getMessage = function(text)
{
    return chromeMock.mock.i18n[text] ? chromeMock.mock.i18n[text] : text;
};

chromeMock.tabs.query = function (queryInfo,callback) {
    callback(chromeMock.mock.tabs);
};
