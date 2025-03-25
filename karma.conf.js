module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',   // Load AngularJS before your app code
      'public/modules/**/*.js',             // Your AngularJS module files
      'tests/**/*.spec.js'                  // Your test files
    ],
    exclude: [],
    preprocessors: {
      'public/modules/**/*.js': ['coverage']  // Track code coverage
    },
    reporters: ['progress', 'coverage'],  // Add coverage to the list of reporters
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Firefox'],
    singleRun: false,
    concurrency: Infinity
  });
};
