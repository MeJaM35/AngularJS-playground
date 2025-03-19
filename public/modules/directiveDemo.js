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

    // Clear the iframe content and write the new snippet
    iframeDoc.open();
    iframeDoc.write($scope.snippetCode);
    iframeDoc.close();

    // Delay to ensure the iframe's DOM is fully loaded
    setTimeout(function() {
      try {
        // Check if AngularJS is already bootstrapped in the iframe
        if (iframeDoc.defaultView.angular) {
          // Manually destroy the existing AngularJS app in the iframe
          var appElement = iframeDoc.querySelector('[ng-app]');
          if (appElement) {
            var appScope = iframeDoc.defaultView.angular.element(appElement).scope();
            if (appScope) {
              appScope.$destroy();
            }
          }
        }

        // Re-bootstrap AngularJS within the iframe
        var appElement = iframeDoc.querySelector('[ng-app]');
        if (appElement) {
          iframeDoc.defaultView.angular.bootstrap(appElement, ['directiveDemoApp']);
        } else {
          console.error("No 'ng-app' element found in the iframe.");
        }
      } catch (error) {
        console.error("Error during iframe AngularJS initialization:", error);
      }
    }, 200); // Increased delay to ensure the iframe's body is available
  };
}]);
