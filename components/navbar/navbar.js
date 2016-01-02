angular.module("navbar", ['LocalStorageModule'])
    .directive('navbar', function() {
        return {
            templateUrl: '/components/navbar/navbar.html',
            transclude: false,
            controller: function ($scope, $location, $http, localStorageService) {
                $scope.users = localStorageService.get('users');
                $scope.logout = function() {
                    localStorageService.remove('users');
                    delete $http.defaults.headers.common["x-access-token"];
                    $location.url('/login');
                }
            }
        }
    })