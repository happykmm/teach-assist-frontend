(function() {
    angular.module('scrollIntoView', [])
        .directive('scrollIntoView', function($timeout) {
            return {
                scope: {
                    scrollIntoView: '='
                },
                link: function (scope, element) {
                    scope.$watchCollection('scrollIntoView', function (newValue) {
                        if (newValue) {
                            $timeout(function() {
                                window.scrollTo(0, findPos(element[0]).top - 100);
                            },0);
                        }
                    });
                }
            }
        });

    function findPos(obj) {
        var curLeft = 0;
        var curTop = 0;
        if (obj.offsetParent) {
            curLeft = obj.offsetLeft
            curTop = obj.offsetTop
            while (obj = obj.offsetParent) {
                curLeft += obj.offsetLeft
                curTop += obj.offsetTop
            }
        }
        return {left: curLeft,  top: curTop};
    }

})();