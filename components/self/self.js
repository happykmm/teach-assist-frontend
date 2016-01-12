(function() {

    angular.module('self', [
        'navbar',
        'ngCkeditor',
        'ngSanitize',
        'flash'
    ]).controller('self', controller);

    function controller($scope, $http, Flash) {
        $scope.intro = "";
        $scope.save = function() {
            if (!$scope.intro) {
                Flash.create("danger", "内容不能为空");
                return false;
            }
            $scope.isEdit = false;
        };

        $http({
            method: 'GET',
            url: 'API/self'
        }).then(function(res) {
            var result = res.data;
            if (result.code === 0) {
                //$scope.intro = result.intro;
            } else {
                console.error(result);
            }
        }, function(err) {
            console.error(err);
        })

    }


})();
