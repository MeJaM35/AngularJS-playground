// public/modules/filterDemo.js
angular.module('filterDemoModule', [])
.controller('FilterDemoController', ['$scope', function($scope) {
  console.log("FilterDemoController loaded");
  $scope.sampleText = "Hello, AngularJS!";
  $scope.snippetCode = 
`<!DOCTYPE html>
<html ng-app="filterDemoApp">
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script>
    angular.module('filterDemoApp', [])
    .filter('reverse', function() {
      return function(input) {
        if (!input) return '';
        return input.split('').reverse().join('');
      };
    })
    .controller('DemoController', ['$scope', function($scope) {
      $scope.sampleText = "Hello, AngularJS!";
    }]);
  </script>
</head>
<body ng-controller="DemoController">
  <div>
    <p>Original Text: {{ sampleText }}</p>
    <p>Reversed Text: {{ sampleText | reverse }}</p>
  </div>
</body>
</html>`;

  $scope.updateIframe = function() {
    var iframe = document.getElementById('liveDemoIframe');
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write($scope.snippetCode);
    iframeDoc.close();

    // Manually bootstrap AngularJS within the iframe
    var script = iframeDoc.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = "angular.bootstrap(document, ['filterDemoApp']);";
    iframeDoc.body.appendChild(script);
  };
}]);
