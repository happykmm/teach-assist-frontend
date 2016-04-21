(function() {

    angular.module("courseIntroSched", [
        //no dependency
    ]).controller("courseIntroSched", courseIntroSched);
    
    function courseIntroSched($scope, $state, $http, $log, $timeout) {
        // 从父控制器继承
        // $scope.course_id
        // $scope.user
        // $scope.state

        $scope.title = ($scope.state[1] === "intro") ? "课程介绍" : "教学计划";
        $scope.isReady = false;
        $scope.content = "";

        $http({
            method: "GET",
            url: "API/courses/"+$scope.course_id+"/"+$scope.state[1]
        }).then(function(res) {
            $scope.content = res.data[$scope.state[1]];
            $scope.isReady = true;
        });

        $scope.save = function() {
            var data = {};
            data[$scope.state[1]] = $scope.content;
            $http({
                method: "PUT",
                url: "API/courses/"+$scope.course_id+"/"+$scope.state[1],
                data: data
            }).then(function(res) {
                $state.go('course.'+$scope.state[1]);
            })
        }
        
    }


})();
