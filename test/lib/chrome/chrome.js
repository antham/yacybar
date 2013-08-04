/**
 * Chrome mock
 */

chrome = {i18n: {}};
chrome.i18n.datas = {};
chrome.i18n.getMessage = function(text)
{
    return chrome.i18n.datas[text] ? chrome.i18n.datas[text] : text;
};
