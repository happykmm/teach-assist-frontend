angular.module("homework", [])
    .directive("homework", function() {
        return {
            templateUrl: "/components/homework/homework.html",
            transclude: false,
            controller: function($scope, $http, $routeParams) {
                //if ($routeParams.param !== "homework")
                //    return false;
                $http({
                    method: 'GET',
                    url: 'API/homework/'+$scope._id
                }).then(function(res) {
                    var result = res.data;
                    if (result.code === 0) {
                        $scope.homework = result.homework;
                    } else {
                        console.error(res);
                    }
                }, function(err) {
                    console.error(err);
                });

            }
        }
    });