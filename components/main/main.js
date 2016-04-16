(function() {

    angular.module("main", [
        'teachAssist',
        'ui.router',
        [
            'ngTouch',
            'angular-carousel',
            'usericon',
            'backgroundImage'
        ]
    ]).controller("main", main);

    function main($scope, userService, $timeout) {
        
        $scope.user = userService();
        
        //必须延迟初始化，否则chrome中会加载失败
        $scope.images = [""];
        $timeout(function() {
            $scope.images = [
                'http://7xpijn.com1.z0.glb.clouddn.com/carousel01.jpg',
                'http://7xpijn.com1.z0.glb.clouddn.com/carousel02.jpg',
                'http://7xpijn.com1.z0.glb.clouddn.com/carousel03.jpg',
                'http://7xpijn.com1.z0.glb.clouddn.com/carousel04.jpg'
            ];
        }, 0);
        
    }

})();