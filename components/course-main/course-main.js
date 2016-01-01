angular.module("courseMain", ['navbar', 'courseAside', 'courseIntroSched', 'courseStudents', 'LocalStorageModule' ])
    .controller("courseMain", function($scope, $http, $routeParams, localStorageService) {
        $scope._id = $routeParams._id;
        $scope.param = $routeParams.param;
        $scope.users = localStorageService.get("users");
        console.log($scope.users.type);
    });