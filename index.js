var app = angular.module('teachingAssistant', ['LocalStorageModule', 'ngRoute','login', 'courses']);

//set API baseURL
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q) {
        return {
            'request': function (config) {
                config.url = config.url.replace("API", "https://teachassist.xyz:8080");
                console.log(config.url);
                return config || $q.when(config);
            }
        }
    })
});

//add x-access-token header
app.run(function ($http, localStorageService) {
    var users = localStorageService.get("users");
    if (users && users.token) {
        console.log("set header x-access-token: " + users.token);
        $http.defaults.headers.common["x-access-token"] = users.token;
    }

});

//config router
app.config(function ($routeProvider) {
    $routeProvider.
        when('/login', {
            templateUrl: '/components/login/login.html',
            controller: 'login'
        }).
        when('/courses', {
            templateUrl: 'components/courses/courses.html',
            controller: 'courses'
        })
        //otherwise({
        //    redirectTo: '/login'
        //});
});

