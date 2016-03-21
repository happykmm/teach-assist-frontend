(function() {

    angular.module("courseStudents", []).
        directive("courseStudents", courseStudents);

    function courseStudents() {
        return {
            templateUrl: '/components/course-students/course-students.html',
            transclude: false,
            controller: controller
        }
    }

    function controller($scope, $http) {
        //if ($routeParams.param !== "students")
        //    return false;

        $scope.students = [];
        $scope.newStudent = null;

        $scope.addStudent = function($event) {
            if ($event && $event.keyCode !== 13)
                return false;
            if (!$scope.newStudent)
                return false;
            $http({
                method: 'POST',
                url: "API/courses/"+$scope._id+"/students",
                data: {
                    students: [$scope.newStudent]
                }
            }).then(function(res) {
                var newStudent = res.data.students[0];
                var isExist = false;
                $scope.students.forEach(function(student) {
                    if (student._id === newStudent._id) {
                        isExist = true;
                        return false;
                    }
                });
                if (!isExist)
                    $scope.students.push(newStudent);
                $scope.newStudent = null;
            }, function(err) {
                console.log(err);
            });
        }

        $scope.delStudent = function($index) {
            var _id = $scope.students[$index]._id;
            $http({
                method: 'DELETE',
                url: "API/courses/"+$scope._id+"/students",
                params: {
                    students: [_id]
                }
            }).then(function(res) {
                var result = res.data;
                if (result.code === 0) {
                    console.log($scope.students);
                    $scope.students.splice($index, 1);
                    console.log($scope.students);
                } else {
                    console.error(res);
                }
            }, function(err) {
                console.error(err);
            })
        }

        $http({
            method: 'GET',
            url: "API/courses/"+$scope._id+"/students"
        }).then(function(res) {
            var result = res.data;
            $scope.students = result.students;
        }, function(err) {
            console.error(err);
        });

    }

})();
