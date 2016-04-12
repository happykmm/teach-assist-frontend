(function() {

    angular.module('courseTeacher', [
        'ngSanitize'
    ]).directive('courseTeacher', courseTeacher);

    function courseTeacher() {
        return {
            templateUrl: '/components/course-teacher/course-teacher.html',
            transclude: false,
            controller: function($scope, $http) {
                $http({
                    method: 'GET',
                    url: 'API/courses/'+$scope.course_id+'/teacher'
                }).then(function(res) {
                    $scope.intro = res.data.intro;
                })
            }
        }
    }

})();
