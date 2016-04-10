(function() {

    angular.module("courseIntroSched", [
        [
            'ngCkeditor'
        ]
    ]).controller("courseIntroSched", courseIntroSched);
    
    function courseIntroSched($scope, $http) {
        // 从父控制器继承
        // $scope.course_id
        // $scope.users
        // $scope.state

        $scope.title = ($scope.state === "intro") ? "课程介绍" : "教学计划";
        $scope.content = null;
        $scope.isEdit = false;
        $scope.editorOptions = {};

        $http({
            method: "GET",
            url: "API/courses/"+$scope.course_id+"/"+$scope.state
        }).then(function(res) {
            var result = res.data;
            if (result.code === 0) {
                $scope.content = result[$scope.state];
                console.log(result);
            } else {
                console.error(result);
            }
        }, function(err) {
            console.error(err);
        });

        $scope.save = function() {
            var data = {};
            data[$scope.state] = $scope.content;
            $http({
                method: "PUT",
                url: "API/courses/"+$scope.course_id+"/"+$scope.state,
                data: data
            }).then(function(res) {
                var result = res.data;
                if (result.code !== 0)
                    console.error(result);
            }, function(err) {
                console.error(err);
            })
        }
    }


})();
