angular.module("courseStudents", []).
    directive("courseStudents", function() {
        return {
            templateUrl: '/components/course-students/course-students.html',
            transclude: false,
            controller: function($scope, $routeParams) {
                if ($routeParams.param !== "students")
                    return false;
                console.log("stu man");
            }
        }
    });