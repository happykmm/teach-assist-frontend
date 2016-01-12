(function() {

    angular.module('courseTeacher', [])
        .directive('courseTeacher', courseTeacher);

    function courseTeacher() {
        return {
            templateUrl: '/components/course-teacher/course-teacher.html',
            transclude: false,
            controller: function($scope, $http) {
                $http({
                    method: 'GET',
                    url: 'API/courses/'+$scope._id+'/teacher'
                }).then(function(res) {
                    console.log(res);
                }, function(err) {
                    console.error(err);
                })


            }
        }
    }

})();
