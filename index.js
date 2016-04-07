(function() {

    var DEBUG = true;

    var app = angular.module('teachingAssistant', [
        'LocalStorageModule',
        'ngSanitize',
        //'login',
        //'courses',
        //'courseMain',
        //'coursePosts',
        //'main',
        //'self',
        'ui.router',
        'oc.lazyLoad'
    ]);

    //set API baseURL
    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($q) {
            return {
                'request': function (config) {
                    if (DEBUG === true)
                        config.url = config.url.replace("API", "https://localhost:9999");
                    else
                        config.url = config.url.replace("API", "https://teachassist.xyz:9999");
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
    app.config(function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('index', {
                url:'/',
                templateUrl: 'components/main/main.html',
                controller: 'main',
                resolve:{
                    main:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            'components/main/main.js',
                            'components/usericon/usericon.js'
                        ])
                    }]
                }
            })
            .state('login', {
                url:'/login',
                templateUrl: 'components/login/login.html',
                controller: 'login',
                resolve:{
                    login:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            'components/login/login.js'
                        ])
                    }]
                }
            })
            .state('courses', {
                url:'/courses',
                templateUrl: 'components/courses/courses.html',
                controller: 'courses',
            resolve:{
                courses:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'components/courses/courses.js',
                        'components/navbar/navbar.js',
                        'components/usericon/usericon.js',
                        '/bower_components/angular-datepicker/dist/angular-datepicker.min.js',
                        '/bower_components/ng-ckeditor/ng-ckeditor.min.js',

                    ])
                }]
            }
            })
            .state('courses_id', {
                url:'/courses/:_id^?:param',
                templateUrl: 'components/course-main/course-main.html',
                controller: 'courseMain',
                reloadOnSearch: false,
                resolve:{
                    courseMain:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            'components/course-main/course-main.js',
                            'components/navbar/navbar.js',
                            'components/usericon/usericon.js',
                            'components/course-aside/course-aside.js',
                            'components/course-intro-sched/course-intro-sched.js',
                            'components/course-teacher/course-teacher.js',
                            'components/course-students/course-students.js',
                            'components/course-ware/course-ware.js',
                            'components/homework/homework.js',
                            'components/homework-main/homework-main.js',
                            'components/course-posts/course-posts.js',
                            'components/course-detail/course-detail.js',
                            '/bower_components/angular-datepicker/dist/angular-datepicker.min.js',
                            '/bower_components/ng-ckeditor/ng-ckeditor.min.js'
                        ])
                    }]
                }
            })
            .state('self', {
                url:'/self',
                templateUrl: 'components/self/self.html',
                controller: 'self',
                resolve:{
                    self:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            'components/self/self.js',
                            'components/navbar/navbar.js',
                            'components/usericon/usericon.js',
                            '/bower_components/ng-ckeditor/ng-ckeditor.min.js'
                        ])
                    }]
                }
            })

        //$urlRouterProvider.otherwise('/#/');

    });



})();
