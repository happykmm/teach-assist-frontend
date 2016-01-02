angular.module("courseMain", [
    'navbar',
    'courseAside',
    'courseIntroSched',
    'courseStudents',
    'homework',
    'LocalStorageModule' ])
    .controller("courseMain", function($scope, $http, $routeParams, $location, localStorageService) {
        $scope._id = $routeParams._id;
        $scope.param = Object.keys($location.search())[0];
        $scope.$on('$routeUpdate', function() {
            $scope.param = Object.keys($location.search())[0];
        });
        $scope.users = localStorageService.get("users");
    });