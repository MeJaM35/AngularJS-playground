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
  'factoryDemoModule' // Add the factoryDemoModule here
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      template: '<h2>Welcome to the Feature Playground!</h2><p>Select a demo from the navigation above.</p>'
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
    .otherwise({ redirectTo: '/' });
}]);
