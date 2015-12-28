angular.module('courses', ['navbar']).
    controller('courses', function($scope, $http, localStorageService){

        $scope.users = localStorageService.get("users");
        $http({
            method: "GET",
            url: "API/courses"
        }).then(function (res) {
            var result = res.data;
            if (result.code === 0) {
                console.log(result);
            } else {
                console.error(result);
            }
        }, function(err) {
            console.error(err);
        });
    });