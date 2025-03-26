angular.module('loginModule', [])
.controller('LoginController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.user = {};
    $scope.message = '';
    $scope.isLoading = false;

    $scope.loginUser = function() {
        $scope.isLoading = true;
        $scope.message = '';

        const API_URL = 'https://rag-rag.apps.openshift-dsw.enye.p2.openshiftapps.com/auth/login';

        $http({
            method: 'POST',
            url: API_URL,
            data: {
                username: $scope.user.username,
                password: $scope.user.password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            if (response.data && response.data.access_token) {
                // Store token securely
                localStorage.setItem('access_token', response.data.access_token);
                $scope.message = 'Login successful!';
                
                // Redirect to chat interface
                $location.path('/angularchat/chat');
            } else {
                $scope.message = 'Invalid response from server';
            }
        })
        .catch(function(error) {
            if (error.status === 401) {
                $scope.message = 'Invalid username or password';
            } else if (error.status === 429) {
                $scope.message = 'Too many attempts. Please try again later';
            } else {
                $scope.message = error.data?.detail || 'An error occurred during login';
            }
        })
        .finally(function() {
            $scope.isLoading = false;
        });
    };
}]);