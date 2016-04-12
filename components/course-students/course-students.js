(function() {

    angular.module("courseStudents", [

    ]).controller("courseStudents", courseStudents);

    // function courseStudents() {
    //     return {
    //         templateUrl: '/components/course-students/course-students.html',
    //         transclude: false,
    //         controller: controller
    //     }
    // }

    function courseStudents($scope, $http) {
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
                url: "API/courses/"+$scope.course_id+"/students",
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
            });
        }

        $scope.delStudent = function($index) {
            var _id = $scope.students[$index]._id;
            $http({
                method: 'DELETE',
                url: "API/courses/"+$scope.course_id+"/students",
                params: {
                    students: [_id]
                }
            }).then(function(res) {
                $scope.students.splice($index, 1);
            })
        }

        $http({
            method: 'GET',
            url: "API/courses/"+$scope.course_id+"/students"
        }).then(function(res) {
            $scope.students = res.data.students;
        });

    }

})();
