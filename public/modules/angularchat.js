angular.module('chatModule', ['ngSanitize'])
.controller('ChatController', ['$scope', '$http', '$location', '$sce', function($scope, $http, $location, $sce) {
    $scope.chatHistory = [];
    $scope.userMessage = '';
    $scope.isLoading = false;
    
    // Get token from localStorage
    const getToken = () => localStorage.getItem('access_token');

    // Check if user is authenticated
    const checkAuth = () => {
        if (!getToken()) {
            $location.path('/angularchat/login');
            return false;
        }
        return true;
    };

    $scope.sendMessage = function() {
        // Validate authentication and message
        if (!checkAuth() || !$scope.userMessage.trim()) return;

        $scope.isLoading = true;

        const API_URL = 'https://rag-rag.apps.openshift-dsw.enye.p2.openshiftapps.com/chat/chat';
        
        const data = {
            user_message: $scope.userMessage,
            connection_uri: 'None' // Always set to None as per requirement
        };

        $http({
            method: 'POST',
            url: API_URL,
            data: data,
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            console.log(response.data.gemini_response)
            if (response.data && response.data.gemini_response) {
                $scope.chatHistory.push({
                    user_message: $scope.userMessage,
                    gemini_response: response.data.gemini_response
                });
                $scope.userMessage = ''; // Clear input field
            }
        })
        .catch(function(error) {
            let errorMessage = '⚠️ Error: Unable to process request.';
            
            if (error.status === 401) {
                errorMessage = '⚠️ Session expired. Please login again.';
                localStorage.removeItem('access_token');
                $location.path('/angularchat/login');
            } else if (error.status === 429) {
                errorMessage = '⚠️ Too many requests. Please try again later.';
            }

            $scope.chatHistory.push({
                user_message: $scope.userMessage,
                gemini_response: errorMessage
            });
        })
        .finally(function() {
            $scope.isLoading = false;
        });
    };

    // Add this method to trust HTML
    $scope.trustAsHtml = function(text) {
        return $sce.trustAsHtml(text);
    };

    // Initialize - check authentication
    if (!checkAuth()) return;
}])
.filter('markdown', function() {
    return function(text) {
        if (!text) return '';
        // Basic markdown conversion
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\n\s*\n/g, '<br/><br/>')
            .replace(/\n\*(.*)/g, '<ul><li>$1</li></ul>');
    };
});