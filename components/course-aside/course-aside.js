(function() {

    angular.module("courseAside", [
        "ui.router"
    ]).directive("courseAside", courseAside);
        
        
    function courseAside() {
        return {
            templateUrl: "/components/course-aside/course-aside.html",
            transclude: false,
            scope: {
                // Isolated Scope
                // @ Attribute string binding
                // = Two-way model binding
                // & Callback method binding
                user: "=",
                state: "="
            },
            controller: function() {
                //nothing
            }
        }
    }


})();


