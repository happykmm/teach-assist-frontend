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
                    url: 'API/courses/'+$scope._id+'/teacher'
                }).then(function(res) {
                    var result = res.data;
                    if (result.code === 0) {
                        $scope.intro = result.intro;
                    } else {
                        console.error(result);
                    }
                }, function(err) {
                    console.error(err);
                })


            }
        }
    }

})();
