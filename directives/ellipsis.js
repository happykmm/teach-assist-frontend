(function() {

    angular.module('ellipsis', [
        {
            files: [
                '//cdn.bootcss.com/jquery/2.2.0/jquery.min.js',
                '//cdn.bootcss.com/jQuery.dotdotdot/1.7.4/jquery.dotdotdot.min.js'
            ],
            serie: true
        }

    ]).directive('ellipsis', ellipsis);

    function ellipsis() {
        return {
            required: 'ngBindHtml',
            restrict: 'A',
            priority: 100,
            scope: {
                ellipsis: '@'
            },
            link: function ($scope, element, attrs, ctrl) {
                $scope.hasEllipsis = false;
                $scope.$watch(element.html(), function(value) {
                    if (!$scope.hasEllipsis) {
                        // apply ellipsis only one
                        $scope.hasEllipsis = true;
                        $(element[0]).dotdotdot({
                            ellipsis: $scope.ellipsis || "..."
                        });
                    }
                });
            }
        };
    }

})();
