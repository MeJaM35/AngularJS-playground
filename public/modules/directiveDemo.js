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
  $scope.snippetCode = 
`<!DOCTYPE html>
<html ng-app="directiveDemoApp">
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script>
    angular.module('directiveDemoApp', [])
    .directive('highlightText', function() {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          element.on('mouseenter', function() {
            element.css('background-color', attrs.highlightText || 'yellow');
          });
          element.on('mouseleave', function() {
            element.css('background-color', 'transparent');
          });
        }
      };
    })
    .controller('DemoController', ['$scope', function($scope) {
      $scope.demoText = "Hover over this text to see the custom directive in action!";
    }]);
  </script>
</head>
<body ng-controller="DemoController">
  <p highlight-text="lightblue" class="p-2 border rounded">
    {{ demoText }}
  </p>
</body>
</html>`;

  $scope.updateIframe = function() {
    var iframe = document.getElementById('liveDemoIframe');
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write($scope.snippetCode);
    iframeDoc.close();
  };
}]);
