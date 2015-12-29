angular.module('courses', ['navbar', 'ngAnimate']).
    controller('courses', function($scope, $http, $timeout, localStorageService){
        $http({
            method: "GET",
            url: "API/courses"
        }).then(function (res) {
            var result = res.data;
            if (result.code === 0) {
                $scope.courses = result.content;
                console.log($scope.courses);
            } else {
                console.error(result);
            }
        }, function(err) {
            console.error(err);
        });
        $scope.users = localStorageService.get("users");
        $scope.newName = "";
        $scope.errorDisplay = false;
        $scope.errorMessage = "";
        $scope.addCourse = function() {
            if (!$scope.newName) {
                error("课程名称不能为空");
                return false;
            }
            $http({
                method: "POST",
                url: "API/courses",
                data: {
                    name: $scope.newName
                }
            }).then(function(res) {
                var result = res.data;
                if (result.code === 0) {
                    console.log(result);
                    $scope.courses.push(result.content[0]);
                    $scope.newName = "";
                } else {
                    console.error(result);
                    error(result.desc);
                }
            }, function(err) {
                console.error(err);
                error("网络错误，请稍后重试");
            });
        }

        $scope.delCourse = function($index) {
            var id = $scope.courses[$index]._id;
            console.log(id);
            $http({
                method: "DELETE",
                url: "API/courses",
                params: {
                    _id: $scope.courses[$index]._id
                }
            }).then(function (res) {
                console.log(res);
                var result = res.data;
                if (result.code === 0) {
                    $scope.courses.splice($index, 1);
                } else {
                    console.error(result);
                }
            }, function(err) {
                console.error(err);
            })
        }

        function error(message) {
            $scope.errorMessage = message;
            $scope.errorDisplay = true;
            $timeout(function() {
                $scope.errorDisplay = false;
            }, 1000);
        }
    });