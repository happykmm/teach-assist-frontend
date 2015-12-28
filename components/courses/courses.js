angular.module('courses', []).
    controller('courses', function($scope, $http, localStorageService){
        $scope.courseName = "123321";
        console.log(localStorageService.get("users"));
        $http({
            method: "GET",
            url: "API/courses"
        }).then(function (res) {
            var result = res.data;
            console.log(result);
            if (result.code === 0) {

            } else {
                console.error(result);
            }
        }, function(err) {
            console.error(err);
        });
    });