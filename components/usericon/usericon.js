(function() {

    angular.module('usericon', [
        'LocalStorageModule'
    ]).directive('usericon', usericon);

    function usericon() {
        return {
            templateUrl: '/components/usericon/usericon.html',
            transclude: false,
            controller: function($scope, $location, $http, localStorageService) {
                $scope.logout = function() {
                    localStorageService.remove('users');
                    delete $http.defaults.headers.common["x-access-token"];
                    $location.path('/login').search({});
                }

                $scope.isMore = false;
                $scope.linkTo = function(path) {
                    $location.path(path).search({});
                }

            }
        }

    }

})();