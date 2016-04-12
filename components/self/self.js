(function() {

    angular.module('self', [
        'flash',
        'ngCkeditor',
        [   //dependencies injected by ocLazyLoad
            'navbar',
            'usericon'
        ]
    ]).controller('self', controller);

    function controller($scope, $http, Flash) {
        $scope.intro = "";
        $scope.save = function() {
            if (!$scope.intro) {
                Flash.create("danger", "内容不能为空");
                return false;
            }
            $scope.isEdit = false;
            $http({
                method: 'PUT',
                url: 'API/self',
                data: {
                    intro: $scope.intro
                }
            }).then(function(res) {
                //nothing to do here
            })
        };

        $http({
            method: 'GET',
            url: 'API/self'
        }).then(function(res) {
            $scope.intro = res.data.intro;
        })

    }


})();
