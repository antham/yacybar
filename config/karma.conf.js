basePath = '../';

files = [
    JASMINE,
    JASMINE_ADAPTER,
    "app/bower_components/angular/angular.min.js",
    "app/bower_components/angular-resource/angular-resource.min.js",
    "app/bower_components/angular-route/angular-route.min.js",
    "app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
    "app/bower_components/angular-cookies/angular-cookies.min.js",
    "app/bower_components/uri.js/src/URI.min.js",
    'app/bower_components/angular-mocks/angular-mocks.js',
    'test/lib/chrome/chrome.js',
    'app/js/**/*.js',
    'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
    outputFile: 'test_out/unit.xml',
    suite: 'unit'
};
