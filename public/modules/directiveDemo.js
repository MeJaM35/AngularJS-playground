angular.module('directiveDemoModule', [])
.directive('highlightText', function() {
  return {
    restrict: 'A', // Attribute usage
    link: function(scope, element, attrs) {
      element.on('mouseenter', function() {
        element.css('background-color', attrs.highlightText || 'yellow');
      });
      element.on('mouseleave', function() {
        element.css('background-color', 'transparent');
      });
    }
  }
})
.controller('DirectiveDemoController', ['$scope', function($scope) {
  console.log("DirectiveDemoController loaded");
  $scope.demoText = "Hover over this text to see the custom directive in action!";
}]);
