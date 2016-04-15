(function() {

    angular.module('courseTeacher', [
        'ngSanitize'
    ]).controller('courseTeacher', courseTeacher);

    function courseTeacher($scope, $http) {
        $http({
            method: 'GET',
            url: 'API/courses/'+$scope.course_id+'/teacher'
        }).then(function(res) {
            $scope.content = res.data.content;
        })

    }

})();
