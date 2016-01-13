(function() {

    angular.module("homework", [
        'homeworkMain'
    ]).directive("homework", function() {
        return {
            templateUrl: "/components/homework/homework.html",
            transclude: false,
            controller: function() {

            }
        }
    });



})();
