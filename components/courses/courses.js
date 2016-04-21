(function() {

    angular.module('courses', [
        'ngAnimate',
        'ngFlash',
        [
            'navbar',
            'usericon'
        ]
    ]).controller('courses', courses);

    function courses($scope, $http, localStorageService, Flash, $state){

        $scope.users = localStorageService.get("users");
        $scope.newName = "";

        $scope.showDetail = function(course_id) {
            $state.go('course',{'course_id':course_id});
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
                $scope.courses.push(res.data.content[0]);
                $scope.newName = "";
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
                $scope.courses.splice($index, 1);
            })
        };

        $http({
            method: "GET",
            url: "API/courses"
        }).then(function (res) {
            $scope.courses = res.data.content;
        });
    }

})();
