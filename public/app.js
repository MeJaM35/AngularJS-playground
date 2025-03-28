// First, let's create a theme service to manage the dark/light mode
angular.module('themeModule', [])
.service('ThemeService', ['$rootScope', function($rootScope) {
  // Default to light mode or user's system preference
  this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Method to toggle theme
  this.toggleTheme = function() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    $rootScope.$broadcast('themeChanged', this.isDarkMode);
  };
  
  // Apply the current theme
  this.applyTheme = function() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Store preference in localStorage
    localStorage.setItem('darkMode', this.isDarkMode);
  };
  
  // Initialize theme from localStorage or system preference
  this.initTheme = function() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      this.isDarkMode = savedMode === 'true';
    }
    this.applyTheme();
  };
}])
.directive('themeToggle', ['ThemeService', function(ThemeService) {
  return {
    restrict: 'E',
    template: `
      <button class="theme-toggle px-4 py-2 rounded-md" ng-click="toggleTheme()">
        <span ng-if="isDarkMode">☀️ Light</span>
        <span ng-if="!isDarkMode">🌙 Dark</span>
      </button>
    `,
    link: function(scope) {
      scope.isDarkMode = ThemeService.isDarkMode;
      
      scope.toggleTheme = function() {
        ThemeService.toggleTheme();
        scope.isDarkMode = ThemeService.isDarkMode;
      };
      
      // Listen for theme changes from other components
      scope.$on('themeChanged', function(event, isDarkMode) {
        scope.isDarkMode = isDarkMode;
      });
    }
  };
}])
.run(['ThemeService', function(ThemeService) {
  // Initialize theme on app startup
  ThemeService.initTheme();
}]);

// Now let's update app.js to include our new theme module
angular.module('featurePlayground', [
  'ngRoute', 
  'ngAnimate',
  'bindingDemoModule', 
  'routingDemoModule', 
  'directiveDemoModule',
  'serviceDemoModule',
  'httpDemoModule',
  'filterDemoModule',
  'animationDemoModule',
  'codeMirrorModule',
  'templateDemoModule',
  'factoryDemoModule',
  'scopeDemoModule',
  'controllerDemoModule',
  'themeModule', 
  'debuggerDemoModule',
  'unittestDemoModule',
  'debugInfoDemoModule',
  'loginModule',
  'registerModule',
  'chatModule'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/landingPage.html'
    })
    .when('/binding', {
      templateUrl: 'templates/binding-demo.html',
      controller: 'BindingDemoController'
    })
    .when('/routing', {
      templateUrl: 'templates/routing-demo.html',
      controller: 'RoutingDemoController'
    })
    .when('/directive', {
      templateUrl: 'templates/directive-demo.html',
      controller: 'DirectiveDemoController'
    })
    .when('/service', {
      templateUrl: 'templates/service-demo.html',
      controller: 'ServiceDemoController'
    })
    .when('/http', {
      templateUrl: 'templates/http-demo.html',
      controller: 'HttpDemoController'
    })
    .when('/filter', {
      templateUrl: 'templates/filter-demo.html',
      controller: 'FilterDemoController'
    })
    .when('/animation', {
      templateUrl: 'templates/animation-demo.html',
      controller: 'AnimationDemoController'
    })
    .when('/template', {
      templateUrl: 'templates/template-demo.html',
      controller: 'TemplateDemoController'
    })
    .when('/factory', {
      templateUrl: 'templates/factory-demo.html',
      controller: 'FactoryDemoController'
    })
    .when('/scope', {
      templateUrl: 'templates/scope-demo.html',
      controller: 'ScopeDemoController'
    })
    .when('/controller', {
      templateUrl: 'templates/controller-demo.html',
      controller: 'ControllerDemoController'
    })
    .when('/debugger', {
      templateUrl: 'templates/debugger-demo.html',
      controller: 'DebuggerDemoController'
    })
    .when('/unittest', {
      templateUrl: 'templates/unittest-demo.html',
      controller: 'UnitTestDemoController'
    })
    .when('/debuginfo', {
      templateUrl: 'templates/debuginfo-demo.html',
      controller: 'DebugInfoDemoController'
    })
    .when('/angularchat/home', {
      templateUrl: 'templates/angular_chat_home.html',
    })
    .when('/angularchat/login', {
      templateUrl: 'templates/angular_chat_login.html',
      controller: 'LoginController'  
    })
    .when('/angularchat/register', {
      templateUrl: 'templates/angular_chat_register.html',
      controller: 'RegisterController'
    })
    .when('/angularchat/chat', {
      templateUrl: 'templates/angular_chat.html',
      controller: 'ChatController'
    })
    .otherwise({ redirectTo: '/' });
}])
.controller('MainController', ['$scope', 'ThemeService', function($scope, ThemeService) {
  $scope.isDarkMode = ThemeService.isDarkMode;
  
  $scope.$on('themeChanged', function(event, isDarkMode) {
    $scope.isDarkMode = isDarkMode;
  });
}]);