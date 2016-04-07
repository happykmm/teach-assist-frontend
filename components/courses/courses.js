(function() {

    angular.module('courses', [
        'ngAnimate'
    ]).controller('courses', courses);

    function courses($scope, $http, localStorageService, Flash,$state){

        $scope.users = localStorageService.get("users");
        $scope.newName = "";

        $scope.showDetail = function(course_id) {
            $state.go('courses_id',{'_id':course_id,'param':'intro'});
        };

        $scope.addCourse = function() {
            if (!$scope.newName) {
                Flash.create("danger", "课程名称不能为空");
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
                    Flash.create("danger", result.desc);
                }
            }, function(err) {
                console.error(err);
                Flash.create("danger", "网络错误，请稍后重试");
            });
        };

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
                    Flash.create("danger", result.desc);
                }
            }, function(err) {
                console.error(err);
                Flash.create("danger", "网络错误，请稍后重试");
            })
        };

        $http({
            method: "GET",
            url: "API/courses"
        }).then(function (res) {
            var result = res.data;
            if (result.code === 0) {
                console.log(result);
                $scope.courses = result.content;
            } else {
                console.error(result);
                Flash.create("danger", result.desc);
            }
        }, function(err) {
            console.error(err);
            Flash.create("danger", "网络错误，请稍后重试");
        });
    }

})();
