basePath = '../';

files = [
    JASMINE,
    JASMINE_ADAPTER,
    "app/bower_components/angular/angular.min.js",
    "app/bower_components/angular-ui/build/angular-ui-ieshiv.min.js",
    "app/bower_components/angular-ui/build/angular-ui.min.js",
    "app/bower_components/angular-bootstrap/ui-bootstrap.min.js",
    "app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
    "app/bower_components/angular-cookies/angular-cookies.min.js",
    "app/bower_components/angular-localStorage/src/localFactory.js",
    'test/lib/angular/angular-mocks.js',
    'app/js/**/*.js',
    'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
    outputFile: 'test_out/unit.xml',
    suite: 'unit'
};
