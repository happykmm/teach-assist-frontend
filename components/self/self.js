(function() {

    angular.module('self', [
        [   //dependencies injected by ocLazyLoad
            'navbar',
            'usericon'
        ]
    ]).controller('self', controller);

    function controller($scope, $state, $rootScope, $http, Flash) {

        $scope.state = $state.current.name.split('.');
        var cleanUp = $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options){
                $scope.state = toState.name.split('.');
            });
        //注销事件监听，否则会导致内存泄露
        $scope.$on('$destroy', function() {
            cleanUp();
        });
        
        $scope.content = "";
        $scope.save = function() {
            if (!$scope.content) return Flash.create("danger", "内容不能为空");
            $http({
                method: 'PUT',
                url: 'API/self',
                data: {
                    intro: $scope.content
                }
            }).then(function(res) {
                //nothing to do here
            })
        };

        $http({
            method: 'GET',
            url: 'API/self'
        }).then(function(res) {
            $scope.content = res.data.intro;
        })

    }


})();
