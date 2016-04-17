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
                '//o5ryrw40v.qnssl.com/carousel01.jpg',
                '//o5ryrw40v.qnssl.com/carousel02.jpg',
                '//o5ryrw40v.qnssl.com/carousel03.jpg',
                '//o5ryrw40v.qnssl.com/carousel04.jpg'
            ];
        }, 0);
        
    }

})();