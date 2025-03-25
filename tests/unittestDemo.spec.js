describe('UnitTestDemoController', function() {
    beforeEach(module('unittestDemoModule'));
  
    var $controller, $scope;
  
    beforeEach(inject(function(_$controller_, $rootScope) {
        $scope = $rootScope.$new();
        $controller = _$controller_('UnitTestDemoController', { $scope: $scope });
    }));
  
    it('should initialize with correct greeting', function() {
        expect($scope.greeting).toBe('Hello from UnitTestDemoController!');
    });
  });
  