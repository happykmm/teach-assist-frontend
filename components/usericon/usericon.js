(function() {

    angular.module('usericon', [
        'teachAssist',
        'ui.router'
    ]).directive('usericon', usericon);

    function usericon() {
        return {
            templateUrl: '/components/usericon/usericon.html',
            transclude: false,
            controller: function($scope, $state, $http, userService) {
                $scope.isMore = false;
                $scope.user = userService();
                
                $scope.logout = function() {
                    userService(null);
                    $state.go("login");
                }
            }
        }
    }

})();