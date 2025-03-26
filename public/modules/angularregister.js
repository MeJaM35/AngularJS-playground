angular.module('registerModule', [])
.controller('RegisterController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.user = {};
    $scope.message = '';
    $scope.isLoading = false;
    $scope.errors = {};

    // Validation functions
    function validateUsername(username) {
        return username && username.length >= 3 && username.length <= 20;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password && password.length >= 8 && password.length <= 32;
    }

    $scope.registerUser = function() {
        // Reset errors and message
        $scope.errors = {};
        $scope.message = '';

        // Validate all fields
        if (!validateUsername($scope.user.username)) {
            $scope.errors.username = 'Username must be between 3 and 20 characters';
            return;
        }

        if (!validateEmail($scope.user.email)) {
            $scope.errors.email = 'Please enter a valid email address';
            return;
        }

        if (!validatePassword($scope.user.password)) {
            $scope.errors.password = 'Password must be between 8 and 32 characters';
            return;
        }

        if ($scope.user.password !== $scope.user.conf_pass) {
            $scope.errors.conf_pass = 'Passwords do not match';
            return;
        }

        $scope.isLoading = true;

        const API_URL = 'https://rag-rag.apps.openshift-dsw.enye.p2.openshiftapps.com/auth/register';

        $http({
            method: 'POST',
            url: API_URL,
            data: {
                username: $scope.user.username,
                email: $scope.user.email,
                password: $scope.user.password,
                conf_pass: $scope.user.conf_pass
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            if (response.data && response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token);
                $scope.message = 'Registration successful!';
                $location.path('/angularchat/chat');
            } else {
                $scope.message = 'Invalid response from server';
            }
        })
        .catch(function(error) {
            if (error.status === 400) {
                $scope.message = error.data?.detail || 'Invalid registration data';
            } else if (error.status === 409) {
                $scope.message = 'Username or email already exists';
            } else if (error.status === 429) {
                $scope.message = 'Too many attempts. Please try again later';
            } else {
                $scope.message = error.data?.detail || 'An error occurred during registration';
            }
        })
        .finally(function() {
            $scope.isLoading = false;
        });
    };
}]);