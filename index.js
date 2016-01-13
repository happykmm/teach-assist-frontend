var DEBUG = true;

var app = angular.module('teachingAssistant', [
    'flash',
    'LocalStorageModule',
    'ngRoute',
    'ngSanitize',
    'login',
    'courses',
    'courseMain',
    'coursePosts',
    'main',
    'self'
]);

//set API baseURL
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q) {
        return {
            'request': function (config) {
                if (DEBUG === true)
                    config.url = config.url.replace("API", "https://localhost:8080");
                else
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
        }).
        when('/courses/:_id/', {
            templateUrl: 'components/course-main/course-main.html',
            controller: 'courseMain',
            reloadOnSearch: false
        }).
        when('/', {
            templateUrl: 'components/main/main.html',
            controller: 'main'
        }).
        when('/self', {
            templateUrl: 'components/self/self.html',
            controller: 'self'
        })
        //.
        //when('/courses/:_id/:param', {
        //    templateUrl: 'components/course-main/course-main.html',
        //    controller: 'courseMain'
        //})
        //otherwise({
        //    redirectTo: '/login'
        //});
});

